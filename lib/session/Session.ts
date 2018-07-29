import { User, UserSchema } from "../models";
import { Observable, Observer, StorageUtil, LocalStorage } from "../utils";
import { OAuthWebService, UserWebService, HttpService, HttpInterceptor } from "../services";
import { SessionCredentialsInterceptor, SessionUnauthorizedInterceptor } from "./interceptors";
import { Service, Inject } from "typedi";

export interface SessionOptions {
  autoFetch?: boolean;
  storage?: StorageUtil;
}

@Service()
export default class Session {
  current?: User;
  storage: StorageUtil;
  observable: Observable;
  _interceptors: HttpInterceptor[] = [];

  @Inject(type => UserWebService)
  userWebService: UserWebService;

  @Inject() oauthWebService: OAuthWebService;

  @Inject() http: HttpService;

  public static EVENT_SESSION_CHANGED = "SESSION_CHANGED";

  constructor(public options: SessionOptions) {
    this.observable = new Observable();
    this.storage = options.storage || new StorageUtil("session", new LocalStorage(window));

    // Prepare session interceptors
    this._interceptors = [
      new SessionCredentialsInterceptor(this),
      new SessionUnauthorizedInterceptor(() => this.destroy())
    ];

    // Fetch session in startup by default
    if ((options.autoFetch as any) !== false) {
      this.fetch();
    }
  }

  /**
   * Gets the sesison interceptors for authorized calls and auto session destruction.
   */
  interceptors(): HttpInterceptor[] {
    return this._interceptors;
  }

  /**
   * Subscribe for updates.
   *
   * @param {Observer} observable The instace to be notified
   */
  public subscribe(observable: Observer) {
    this.observable.subscribe(observable);
  }

  /**
   * Unsubscribe from updates.
   *
   * @param {Observer} observable The instance to be removed from listeners
   */
  public unsubscribe(observable: Observer) {
    this.observable.unsubscribe(observable);
  }

  /**
   * Registers a new user in session, notifying all observers.
   *
   * @param user The user instance
   * @param options The operation options
   */
  public async register(user: User, options = { notify: true }) {
    this.current = user;

    // Save in local storage
    await this.storage.put("session", this.current);

    this.http.interceptors(this._interceptors);

    // At last, notify observers of this change
    if (!options || (options && options.notify)) {
      await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
    }
    return this.current;
  }

  /**
   * Fetches the currently stored session.
   */
  protected async fetch() {
    this.current = await this.storage.get("session");

    await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);

    return this.current;
  }

  /**
   * Destroys the session and clears the storage.
   */
  public async destroy() {
    this.current = undefined;

    // Destroys in local storage
    await this.storage.clear();

    // At last, notify observers of this change
    await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);

    if (this.current) {
      // Revokes the token in the OAuth Server
      try {
        await this.oauthWebService.revoke(this.current.credentials.accessToken);
      } catch (exception) {
        console.warn("SESSION: Could not destroy current session", exception);
      }
    }

    return this.current;
  }

  /**
   * Performs a "password" authentication using the OAuth 2.0 server and registers it in current session.
   *
   * @param data The user credentials
   */
  public async password(data: { username: string; password: string }): Promise<User> {
    const oauth = await this.oauthWebService.password(data);

    if (oauth.accessToken) {
      try {
        const user = await this.userWebService.me(oauth);
        return this.register(new User({ ...user, credentials: oauth } as UserSchema));
      } catch (error) {
        error.credentials = oauth;
        throw error;
      }
    }

    throw oauth;
  }

  /**
   * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
   */
  public async clientCredentials(): Promise<User> {
    const oauth = await this.oauthWebService.clientCredentials();

    try {
      if (oauth.accessToken && !oauth.virtual) {
        const user = await this.userWebService.me(oauth);
        return this.register(user);
      }
      if (oauth.accessToken) {
        return this.register(new User({ id: oauth.userId, credentials: oauth }));
      }
    } catch (error) {
      error.credentials = oauth;
      throw error;
    }

    throw oauth;
  }
}
