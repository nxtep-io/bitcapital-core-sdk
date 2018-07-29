import { HttpService } from ".";
import { OAuthAccessToken } from "../models";
import { PaginationUtil, PaginatedArray } from "../utils";
import { Inject, Service } from "typedi";

@Service()
export default class OAuthAccessTokenWebService {
  @Inject() protected http: HttpService;

  /**
   * Finds {#OAuthAccessToken} with a given query
   * @param query The query of the search
   */
  public async find(query: any = {}): Promise<PaginatedArray<OAuthAccessToken>> {
    const response = await this.http.get("/tokens", query);

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((token: any) => new OAuthAccessToken(token));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#OAuthAccessToken} by giving it's User ID
   * @param id The id of the {#OAuthAccessToken}.
   */
  public async findByUser(user: string): Promise<OAuthAccessToken> {
    const response = await this.http.get(`/tokens`, { user });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthAccessToken(response.data);
  }
}
