import { HttpService } from ".";
import { Domain, DomainSchema, User } from "../models";
import { PaginationUtil, PaginatedArray } from "../utils";
import { Inject, Service } from "typedi";

@Service()
export default class DomainWebService {
  @Inject() protected http: HttpService;

  /**
   * Find all {#Domain}s
   */
  public async findAll(): Promise<PaginatedArray<Domain>> {
    const response = await this.http.get("/domains");

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: DomainSchema) => new Domain(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findById(id: string): Promise<Domain> {
    const response = await this.http.get(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Find the {#User}s from a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findUsersById(id: string): Promise<User> {
    const response = await this.http.get(`/domains/${id}/users`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the {#User}s with role {#Consumer} from a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findConsumersById(id: string): Promise<User> {
    const response = await this.http.get(`/domains/${id}/consumers`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the {#User}s with role Mediator from a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findMediatorsById(id: string): Promise<User> {
    const response = await this.http.get(`/domains/${id}/mediators`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Create a new {#Domain}.
   *
   * @param domain The {#Domain} properties
   */
  public async create(domain: DomainSchema): Promise<Domain> {
    const response = await this.http.post("/domains", domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Partially update an existing {#Domain}.
   *
   * @param id the id of the {#Domain}
   * @param domain The values you want to update
   */
  public async update(id: string, domain: Partial<DomainSchema>): Promise<Domain> {
    const response = await this.http.post(`/domains/${id}`, domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Upsert a {#Domain}.
   *
   * @param domain The values you want to upsert
   */
  public async upsert(domain: DomainSchema): Promise<Domain> {
    const response = await this.http.put(`/domains`, domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Delete a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async deleteById(id: string): Promise<boolean> {
    const response = await this.http.delete(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
