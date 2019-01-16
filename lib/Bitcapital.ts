import { User } from "./models";
import {
  AssetWebService,
  ConsumerWebService,
  DomainWebService,
  OAuthWebService,
  OAuthWebServiceOptions,
  PaymentWebService,
  UserWebService,
  WalletWebService,
  BankingWebService
} from "./services";
import { BaseModelWebServiceOptions } from "./services/base/BaseModelWebService";
import { OAuthStatusResponse } from "./services/response";
import { Session } from "./session";
import { RequestSigningOptions, RequestUtil } from "./utils";

export interface BitcapitalOptions {
  session?: Session;
  baseURL: string;
  clientId: string;
  clientSecret: string;
}

/**
 * The main interface for the Bitcapital SDK, holds credentials, instance options and all internal modules.
 */
export default class Bitcapital {
  protected readonly _session: Session;
  protected static _instance: Bitcapital;

  /**
   * Construct a new Bitcapital instance, not safe to call directly, use the `init()` method.
   *
   * @param options The bitcapital options and credentials
   */
  protected constructor(protected readonly options: BitcapitalOptions) {
    // Initialize session instance, OAuth and User web services will be initialized automatically
    this._session =
      options.session ||
      Session.initialize({
        oauth: {
          ...(options as OAuthWebServiceOptions)
        },
        http: {
          ...(options as BaseModelWebServiceOptions)
        }
      });

    // Initialize main web services
    AssetWebService.initialize({ ...options });
    BankingWebService.initialize({ ...options });
    ConsumerWebService.initialize({ ...options });
    DomainWebService.initialize({ ...options });
    PaymentWebService.initialize({ ...options });
    WalletWebService.initialize({ ...options });

    // Prepare singleton for easier access
    if (!Bitcapital._instance) {
      Bitcapital._instance = this;
    }
  }

  /**
   * Gets the singleton instance, if already initialized and available.
   */
  public static getInstance(): Bitcapital | undefined {
    return this._instance;
  }

  /**
   * Initialize the Bitcapital SDK with credentials.
   *
   * @param options The bitcapital options and credentials.
   */
  public static initialize(options: BitcapitalOptions) {
    return new Bitcapital(options);
  }

  /**
   * Generate signature headers for the specificed request.
   *
   * @param request The request object
   */
  public sign(request: RequestSigningOptions) {
    return RequestUtil.sign(this.options.clientSecret, request);
  }

  /**
   * Get the API Status.
   */
  public async status(): Promise<OAuthStatusResponse> {
    return this._session.oauthWebService.status();
  }

  /**
   * Get the currently authenticated user in the SDK, if any.
   */
  public current(): User | undefined {
    return this._session.current;
  }

  /**
   * Get the Bitcapital session instance.
   */
  public session(): Session {
    return this._session;
  }

  /**
   * Interface for the OAuth 2.0 service.
   */
  public oauth(): OAuthWebService {
    return this._session.oauthWebService;
  }

  /**
   * Interface for the Assets service.
   */
  public assets(): AssetWebService {
    return AssetWebService.getInstance();
  }

  /**
   * Interface for the Bankings service.
   */
  public bankings(): BankingWebService {
    return BankingWebService.getInstance();
  }

  /**
   * Interface for the Consumers service.
   */
  public consumers(): ConsumerWebService {
    return ConsumerWebService.getInstance();
  }

  /**
   * Interface for the Domains service.
   */
  public domains(): DomainWebService {
    return DomainWebService.getInstance();
  }

  /**
   * Interface for the Payments service.
   */
  public payments(): PaymentWebService {
    return PaymentWebService.getInstance();
  }

  /**
   * Interface for the Users service.
   */
  public users(): UserWebService {
    return UserWebService.getInstance();
  }

  /**
   * Interface for the Wallets service.
   */
  public wallets(): WalletWebService {
    return WalletWebService.getInstance();
  }
}
