import { Asset, AssetEmitRequestSchema, AssetSchema, Payment } from "../models";
import { PaginatedArray, Pagination, PaginationUtil } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";

export interface AssetWebServiceOptions extends BaseModelWebServiceOptions {}

export default class AssetWebService extends BaseModelWebService<Asset, AssetSchema> {
  protected static instance: AssetWebService;

  constructor(options: AssetWebServiceOptions) {
    super(options);
  }

  public static getInstance(): AssetWebService {
    return this.instance;
  }

  public static initialize(options: AssetWebServiceOptions): AssetWebService {
    this.instance = new AssetWebService(options);
    return this.instance;
  }

  /**
   * Find all {#Asset}s
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<Asset>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/assets", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: AssetSchema) => new Asset(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#Asset} by it's id.
   *
   * @param id The id of the {#Asset}
   */
  public async findOne(id: string): Promise<Asset> {
    const response = await this.http.get(`/assets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Emits an {#Asset} by it's id.
   *
   * @param id The id of the {#Asset}
   * @param amount The amount to be emitted
   * @param [destination] The destination wallet
   */
  public async emit(request: AssetEmitRequestSchema): Promise<Payment> {
    const { id, amount, destination } = request;

    const response = await this.http.post(`/assets/${id}/emit`, { amount, destination });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Payment(response.data);
  }

  /**
   * Create a new {#Asset}.
   *
   * @param asset The {#Asset} properties
   */
  public async create(asset: AssetSchema): Promise<Asset> {
    const response = await this.http.post("/assets", asset);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Partially update an existing {#Asset}.
   *
   * @param id the id of the {#Asset}
   * @param asset The values you want to update
   */
  public async update(id: string, asset: Partial<AssetSchema>): Promise<Asset> {
    const response = await this.http.post(`/assets/${id}`, asset);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Delete a {#Asset} by it's id.
   *
   * @param id The id of the {#Asset}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/assets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
