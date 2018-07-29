import { stringify } from "qs";
import { Buffer } from "buffer";
import { HttpService } from ".";
import { OAuthCredentials } from "../models";
import { OAuthPasswordRequest, OAuthClientCredentialsRequest } from "./request";
import { OAuthStatusResponse } from "./response";
import { Service, Inject } from "typedi";

export interface OAuthWebServiceOptions {
  clientId: string;
  clientSecret: string;
}

@Service()
export default class OAuthWebService {
  protected options: OAuthWebServiceOptions;
  protected static instance: OAuthWebService;

  @Inject() protected http: HttpService;

  initialize(options: OAuthWebServiceOptions) {
    this.options = options;
  }

  /**
   * Gets basic token for client credentials authentication.
   *
   * @returns {String}
   */
  public static getBasicToken(data: { clientId: string; clientSecret: string }): String {
    const mask = `${data.clientId}:${data.clientSecret}`;
    return new Buffer(mask).toString("base64");
  }

  /**
   * Performs a "password" authentication using the OAuth 2.0 server.
   *
   * @param data The user credentials
   */
  public async password(data: { username: string; password: string }): Promise<OAuthCredentials> {
    const request = new OAuthPasswordRequest(data.username, data.password);
    const response = await this.http.post("/oauth/token", stringify(request), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}`
      }
    });

    if (response && response.status === 200) {
      return new OAuthCredentials(response.data);
    }
    throw response;
  }

  /**
   * Performs a "client_credentials" authentication using the OAuth 2.0 server.
   */
  public async clientCredentials(): Promise<OAuthCredentials> {
    const request = new OAuthClientCredentialsRequest();
    const response = await this.http.post("/oauth/token", stringify(request), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}`
      }
    });

    if (response && response.status === 200) {
      return new OAuthCredentials(response.data);
    }
    throw response;
  }

  /**
   * Revokes one or all tokens from a user using the OAuth 2.0 server.
   *
   * @param accessToken The user access token
   */
  public async revoke(accessToken?: String): Promise<void> {
    const response = await this.http.post(
      "/oauth/revoke",
      { accessToken },
      {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      }
    );

    // The client may choose to ignore this error, as it wouldn't interfere with the user flow.
    if (!response || response.status !== 200) {
      throw response;
    }
  }

  /**
   * Gets the server status.
   */
  public async status(): Promise<OAuthStatusResponse> {
    const response = await this.http.get(`/`);

    if (response && response.status === 200) {
      return new OAuthStatusResponse(response.data);
    }

    throw response;
  }
}
