import { HttpService } from ".";
import { AnalyticsActiveResponse, AnalyticsDevicesResponse } from "./response";
import { Service, Inject } from "typedi";

@Service()
export default class AnalyticsWebService {
  @Inject() protected http: HttpService;

  /**
   * Gets analytics for the currently active tokens.
   */
  public async active(query: any = {}): Promise<AnalyticsActiveResponse> {
    const response = await this.http.get("/analytics/active", query);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new AnalyticsActiveResponse(response.data);
  }

  /**
   * Gets device analytics from recent tokens.
   */
  public async devices(query: any = {}): Promise<AnalyticsDevicesResponse> {
    const response = await this.http.get("/analytics/devices", query);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new AnalyticsDevicesResponse(response.data);
  }
}
