"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const services_1 = require("../services");
const utils_1 = require("../utils");
const interceptors_1 = require("./interceptors");
/**
 * An abstraction layer to securely store and manage platform credentials.
 *
 * The Session is a singleton, so you may access the authentication state
 * at any time, in any context, getting its current instance. It is also
 * an observable, so it can be watched for changes:
 *
 ```typescript
import { Observer } from 'bitcapital-core-sdk';

// Gets the current Session instance
const session = bitcapital.session();

// Shows the current user instance, if any
console.log(session.current);

// Prepare a new session observer (typescript notation)
const observer: Observer = {
  update(event: string, data: User) {
    if(event === Session.EVENT_SESSION_CHANGED) {
      console.log('User instance has changed in Session', { user: data });
    }
  }
};

// Start listening to Session changes, such as credentials
// expiration or a refreshed access token.
session.subscribe(observer);

// ...

// Eventually, you can also stop listening to its changes
session.unsubscribe(observer);
 ```
 */
class Session {
    constructor(options) {
        this.options = options;
        this._interceptors = [];
        this.observable = new utils_1.Observable();
        this.storage = options.storage || new utils_1.StorageUtil("session");
        // Prepare web services
        this.userWebService = options.http ? services_1.UserWebService.initialize(options.http) : services_1.UserWebService.getInstance();
        this.oauthWebService = options.oauth ? services_1.OAuthWebService.initialize(options.oauth) : services_1.OAuthWebService.getInstance();
        // Prepare Session interceptors
        this._interceptors = [
            new interceptors_1.SessionCredentialsInterceptor(this),
            new interceptors_1.SessionUnauthorizedInterceptor(() => {
                try {
                    const refreshToken = this.current.credentials && this.current.credentials.refreshToken;
                    if (refreshToken) {
                        // If there's a refresh token, try to refresh it
                        this.refreshToken({ refreshToken });
                    }
                    else {
                        // No refresh token, just destroy the session
                        this.destroy();
                    }
                }
                catch (error) {
                    // Refresh token auth failed, destroy the session
                    this.destroy();
                }
            })
        ];
        // Fetch session in startup by default
        if (options.autoFetch !== false) {
            this.fetch();
        }
    }
    /**
     * Get the Session interceptors for authorized calls and auto Session destruction.
     */
    interceptors() {
        return this._interceptors;
    }
    /**
     * Get the Session singleton instance.
     */
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new Session(options);
        return this.instance;
    }
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified.
     */
    subscribe(observable) {
        this.observable.subscribe(observable);
    }
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners.
     */
    unsubscribe(observable) {
        this.observable.unsubscribe(observable);
    }
    /**
     * Register a new User in session, notifying all observers.
     *
     * @param user The User instance.
     * @param {{notify: boolean}} options The operation options.
     */
    register(user, options = { notify: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = user;
            // Save in local storage
            yield this.storage.put("session", this.current);
            // At last, notify observers of this change
            if (!options || (options && options.notify)) {
                yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            }
            return this.current;
        });
    }
    /**
     * Fetch the currently stored Session from local storage.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = yield this.storage.get("session");
            yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            return this.current;
        });
    }
    /**
     * Reload the current User using the remote server.
     */
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.current) {
                const oauth = this.current.credentials;
                const user = yield this.userWebService.me(oauth);
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
            }
        });
    }
    /**
     * Destroy the Session and clears the storage.
     */
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = undefined;
            // Destroys in local storage
            yield this.storage.clear();
            // At last, notify observers of this change
            yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            if (this.current) {
                // Revokes the token in the OAuth Server
                try {
                    yield this.oauthWebService.revoke(this.current.credentials.accessToken);
                }
                catch (exception) {
                    console.warn("SESSION: Could not destroy current session", exception);
                }
            }
            return this.current;
        });
    }
    /**
     * Perform a "password" authentication using the OAuth 2.0 server and registers it in current Session.
     *
     * @param data The User credentials.
     */
    password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth = yield this.oauthWebService.password({
                username: data.username,
                password: data.password,
                scope: data.scopes ? data.scopes.join(",") : data.scope
            });
            if (!oauth.accessToken) {
                throw oauth;
            }
            try {
                const user = yield this.userWebService.me(oauth);
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
            }
            catch (error) {
                error.credentials = oauth;
                throw error;
            }
        });
    }
    /**
     * Performs a "refresh_token" authentication using the OAuth 2.0 server and registers it in current session.
     * This method is automatically called on requests that return 401
     *
     * @param {RefreshGrantOptions} data
     */
    refreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth = yield this.oauthWebService.refreshToken({
                refreshToken: data.refreshToken
            });
            if (!oauth.accessToken) {
                throw oauth;
            }
            try {
                const user = yield this.userWebService.me(oauth);
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
            }
            catch (error) {
                error.credentials = oauth;
                throw error;
            }
        });
    }
    /**
     * Perform a "client_credentials" authentication using the OAuth 2.0 server and registers it in current Session.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            // The client ID and client secret will be passed by the OAuthWebService
            const oauth = yield this.oauthWebService.clientCredentials();
            try {
                if (oauth.accessToken && !oauth.virtual) {
                    const user = yield this.userWebService.me(oauth);
                    return this.register(user);
                }
                if (oauth.accessToken) {
                    return this.register(new models_1.User({ id: oauth.userId, credentials: oauth }));
                }
            }
            catch (error) {
                error.credentials = oauth;
                throw error;
            }
            throw oauth;
        });
    }
}
Session.EVENT_SESSION_CHANGED = "SESSION_CHANGED";
exports.default = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNDQUE2QztBQUM3QywwQ0FBc0Y7QUFFdEYsb0NBQTZEO0FBQzdELGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSDtJQVlFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVHLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpILCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMs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QUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksYUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDMUU7YUFDRjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixNQUFNLEtBQUssQ0FBQzthQUNiO1lBRUQsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0tBQUE7O0FBak5hLDZCQUFxQixHQUFHLGlCQUFpQixDQUFDO0FBUjFELDBCQTBOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBVc2VyLCBVc2VyU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xuaW1wb3J0IHsgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLCBVc2VyV2ViU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3RvcmFnZVV0aWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yLCBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyB7XG4gIGh0dHA/OiBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucztcbiAgb2F1dGg/OiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBzdG9yYWdlPzogU3RvcmFnZVV0aWw7XG4gIGF1dG9GZXRjaD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFzc3dvcmRHcmFudE9wdGlvbnMge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBzY29wZXM/OiBzdHJpbmdbXTtcbiAgc2NvcGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVmcmVzaEdyYW50T3B0aW9ucyB7XG4gIHJlZnJlc2hUb2tlbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0aW9uIGxheWVyIHRvIHNlY3VyZWx5IHN0b3JlIGFuZCBtYW5hZ2UgcGxhdGZvcm0gY3JlZGVudGlhbHMuXG4gKlxuICogVGhlIFNlc3Npb24gaXMgYSBzaW5nbGV0b24sIHNvIHlvdSBtYXkgYWNjZXNzIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZVxuICogYXQgYW55IHRpbWUsIGluIGFueSBjb250ZXh0LCBnZXR0aW5nIGl0cyBjdXJyZW50IGluc3RhbmNlLiBJdCBpcyBhbHNvXG4gKiBhbiBvYnNlcnZhYmxlLCBzbyBpdCBjYW4gYmUgd2F0Y2hlZCBmb3IgY2hhbmdlczpcbiAqXG4gYGBgdHlwZXNjcmlwdFxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdiaXRjYXBpdGFsLWNvcmUtc2RrJztcblxuLy8gR2V0cyB0aGUgY3VycmVudCBTZXNzaW9uIGluc3RhbmNlXG5jb25zdCBzZXNzaW9uID0gYml0Y2FwaXRhbC5zZXNzaW9uKCk7XG5cbi8vIFNob3dzIHRoZSBjdXJyZW50IHVzZXIgaW5zdGFuY2UsIGlmIGFueVxuY29uc29sZS5sb2coc2Vzc2lvbi5jdXJyZW50KTtcblxuLy8gUHJlcGFyZSBhIG5ldyBzZXNzaW9uIG9ic2VydmVyICh0eXBlc2NyaXB0IG5vdGF0aW9uKVxuY29uc3Qgb2JzZXJ2ZXI6IE9ic2VydmVyID0ge1xuICB1cGRhdGUoZXZlbnQ6IHN0cmluZywgZGF0YTogVXNlcikge1xuICAgIGlmKGV2ZW50ID09PSBTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCkge1xuICAgICAgY29uc29sZS5sb2coJ1VzZXIgaW5zdGFuY2UgaGFzIGNoYW5nZWQgaW4gU2Vzc2lvbicsIHsgdXNlcjogZGF0YSB9KTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFN0YXJ0IGxpc3RlbmluZyB0byBTZXNzaW9uIGNoYW5nZXMsIHN1Y2ggYXMgY3JlZGVudGlhbHNcbi8vIGV4cGlyYXRpb24gb3IgYSByZWZyZXNoZWQgYWNjZXNzIHRva2VuLlxuc2Vzc2lvbi5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuXG4vLyAuLi5cblxuLy8gRXZlbnR1YWxseSwgeW91IGNhbiBhbHNvIHN0b3AgbGlzdGVuaW5nIHRvIGl0cyBjaGFuZ2VzXG5zZXNzaW9uLnVuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiBgYGBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbiB7XG4gIGN1cnJlbnQ/OiBVc2VyO1xuICBzdG9yYWdlOiBTdG9yYWdlVXRpbDtcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTtcbiAgdXNlcldlYlNlcnZpY2U6IFVzZXJXZWJTZXJ2aWNlO1xuICBvYXV0aFdlYlNlcnZpY2U6IE9BdXRoV2ViU2VydmljZTtcbiAgcHJpdmF0ZSBfaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgRVZFTlRfU0VTU0lPTl9DSEFOR0VEID0gXCJTRVNTSU9OX0NIQU5HRURcIjtcblxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBTZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBTdG9yYWdlVXRpbChcInNlc3Npb25cIik7XG5cbiAgICAvLyBQcmVwYXJlIHdlYiBzZXJ2aWNlc1xuICAgIHRoaXMudXNlcldlYlNlcnZpY2UgPSBvcHRpb25zLmh0dHAgPyBVc2VyV2ViU2VydmljZS5pbml0aWFsaXplKG9wdGlvbnMuaHR0cCkgOiBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMub2F1dGhXZWJTZXJ2aWNlID0gb3B0aW9ucy5vYXV0aCA/IE9BdXRoV2ViU2VydmljZS5pbml0aWFsaXplKG9wdGlvbnMub2F1dGgpIDogT0F1dGhXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBQcmVwYXJlIFNlc3Npb24gaW50ZXJjZXB0b3JzXG4gICAgdGhpcy5faW50ZXJjZXB0b3JzID0gW1xuICAgICAgbmV3IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yKHRoaXMpLFxuICAgICAgbmV3IFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvcigoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzICYmIHRoaXMuY3VycmVudC5jcmVkZW50aWFscy5yZWZyZXNoVG9rZW47XG5cbiAgICAgICAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcmVmcmVzaCB0b2tlbiwgdHJ5IHRvIHJlZnJlc2ggaXRcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFRva2VuKHsgcmVmcmVzaFRva2VuIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBObyByZWZyZXNoIHRva2VuLCBqdXN0IGRlc3Ryb3kgdGhlIHNlc3Npb25cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBSZWZyZXNoIHRva2VuIGF1dGggZmFpbGVkLCBkZXN0cm95IHRoZSBzZXNzaW9uXG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgXTtcblxuICAgIC8vIEZldGNoIHNlc3Npb24gaW4gc3RhcnR1cCBieSBkZWZhdWx0XG4gICAgaWYgKChvcHRpb25zLmF1dG9GZXRjaCBhcyBhbnkpICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5mZXRjaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFNlc3Npb24gaW50ZXJjZXB0b3JzIGZvciBhdXRob3JpemVkIGNhbGxzIGFuZCBhdXRvIFNlc3Npb24gZGVzdHJ1Y3Rpb24uXG4gICAqL1xuICBpbnRlcmNlcHRvcnMoKTogSHR0cEludGVyY2VwdG9yW10ge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmNlcHRvcnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBTZXNzaW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogU2Vzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogU2Vzc2lvbk9wdGlvbnMpOiBTZXNzaW9uIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNlc3Npb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIGZvciB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YWNlIHRvIGJlIG5vdGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YW5jZSB0byBiZSByZW1vdmVkIGZyb20gbGlzdGVuZXJzLlxuICAgKi9cbiAgcHVibGljIHVuc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnVuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IFVzZXIgaW4gc2Vzc2lvbiwgbm90aWZ5aW5nIGFsbCBvYnNlcnZlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VyIFRoZSBVc2VyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge3tub3RpZnk6IGJvb2xlYW59fSBvcHRpb25zIFRoZSBvcGVyYXRpb24gb3B0aW9ucy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWdpc3Rlcih1c2VyOiBVc2VyLCBvcHRpb25zID0geyBub3RpZnk6IHRydWUgfSkge1xuICAgIHRoaXMuY3VycmVudCA9IHVzZXI7XG5cbiAgICAvLyBTYXZlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KFwic2Vzc2lvblwiLCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGlmICghb3B0aW9ucyB8fCAob3B0aW9ucyAmJiBvcHRpb25zLm5vdGlmeSkpIHtcbiAgICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggdGhlIGN1cnJlbnRseSBzdG9yZWQgU2Vzc2lvbiBmcm9tIGxvY2FsIHN0b3JhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgZmV0Y2goKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldChcInNlc3Npb25cIik7XG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbG9hZCB0aGUgY3VycmVudCBVc2VyIHVzaW5nIHRoZSByZW1vdGUgc2VydmVyLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlbG9hZCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XG4gICAgICBjb25zdCBvYXV0aCA9IHRoaXMuY3VycmVudC5jcmVkZW50aWFscztcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBTZXNzaW9uIGFuZCBjbGVhcnMgdGhlIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBEZXN0cm95cyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG5cbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcbiAgICAgIC8vIFJldm9rZXMgdGhlIHRva2VuIGluIHRoZSBPQXV0aCBTZXJ2ZXJcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnJldm9rZSh0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMuYWNjZXNzVG9rZW4pO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlNFU1NJT046IENvdWxkIG5vdCBkZXN0cm95IGN1cnJlbnQgc2Vzc2lvblwiLCBleGNlcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIFwicGFzc3dvcmRcIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgU2Vzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgVGhlIFVzZXIgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGFzc3dvcmQoZGF0YTogUGFzc3dvcmRHcmFudE9wdGlvbnMpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnBhc3N3b3JkKHtcbiAgICAgIHVzZXJuYW1lOiBkYXRhLnVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IGRhdGEucGFzc3dvcmQsXG4gICAgICBzY29wZTogZGF0YS5zY29wZXMgPyBkYXRhLnNjb3Blcy5qb2luKFwiLFwiKSA6IGRhdGEuc2NvcGVcbiAgICB9KTtcblxuICAgIGlmICghb2F1dGguYWNjZXNzVG9rZW4pIHtcbiAgICAgIHRocm93IG9hdXRoO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIFwicmVmcmVzaF90b2tlblwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBzZXNzaW9uLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCBvbiByZXF1ZXN0cyB0aGF0IHJldHVybiA0MDFcbiAgICpcbiAgICogQHBhcmFtIHtSZWZyZXNoR3JhbnRPcHRpb25zfSBkYXRhXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVmcmVzaFRva2VuKGRhdGE6IFJlZnJlc2hHcmFudE9wdGlvbnMpIHtcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnJlZnJlc2hUb2tlbih7XG4gICAgICByZWZyZXNoVG9rZW46IGRhdGEucmVmcmVzaFRva2VuXG4gICAgfSk7XG5cbiAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICB0aHJvdyBvYXV0aDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIFwiY2xpZW50X2NyZWRlbnRpYWxzXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xpZW50Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgLy8gVGhlIGNsaWVudCBJRCBhbmQgY2xpZW50IHNlY3JldCB3aWxsIGJlIHBhc3NlZCBieSB0aGUgT0F1dGhXZWJTZXJ2aWNlXG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5jbGllbnRDcmVkZW50aWFscygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbiAmJiAhb2F1dGgudmlydHVhbCkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKHVzZXIpO1xuICAgICAgfVxuICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgaWQ6IG9hdXRoLnVzZXJJZCwgY3JlZGVudGlhbHM6IG9hdXRoIH0pKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHRocm93IG9hdXRoO1xuICB9XG59XG4iXX0=