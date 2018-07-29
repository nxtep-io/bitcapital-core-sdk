import { HttpService } from ".";
import { OAuthClient, OAuthClientSchema } from "../models";
import { PaginationUtil, PaginatedArray } from "../utils";
import { Inject, Service } from "typedi";

@Service()
export default class OAuthClientWebService {
  @Inject() protected http: HttpService;

  /**
   * Finds {#OAuthClient} with a given query
   * @param query The query of the search
   */
  public async find(query: any = {}): Promise<PaginatedArray<OAuthClient>> {
    const response = await this.http.get("/clients", query);

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((client: any) => new OAuthClient(client));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#OAuthClient} by giving it's ID
   * @param id The id of the {#OAuthClient}.
   */
  public async findById(id: string): Promise<OAuthClient> {
    const response = await this.http.get(`/clients/${id}`, {});

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthClient(response.data);
  }

  /**
   * Creates a new {#OAuthClient}.
   * @param client The {#OAuthClient}. properties
   */
  public async create(client: OAuthClientSchema): Promise<OAuthClient> {
    const response = await this.http.post("/clients", new OAuthClient(client));

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthClient(response.data);
  }

  /**
   * Updates an existing {#OAuthClient}.
   *
   * @param id the id of the {#OAuthClient}
   * @param client The values you want to update
   */
  public async update(id: string, client: OAuthClientSchema): Promise<OAuthClient> {
    const response = await this.http.put(`/clients/${id}`, client);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthClient({ ...response.data });
  }

  /**
   * Deletes a given {#OAuthClient}.
   * @param id The id of the client
   */
  public async deleteById(id: string): Promise<boolean> {
    const response = await this.http.delete(`/users/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
