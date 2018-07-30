import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { AnalyticsActiveResponse, AnalyticsDevicesResponse } from "./response";

export interface AnalyticsWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class AnalyticsWebService {
  protected options: AnalyticsWebServiceOptions;
  protected http: Http;
  protected static instance: AnalyticsWebService;

  constructor(options: AnalyticsWebServiceOptions) {
    this.http = new Http(options);

    if (options.session) {
      this.http.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(): AnalyticsWebService {
    return this.instance;
  }

  public static initialize(options: AnalyticsWebServiceOptions): AnalyticsWebService {
    this.instance = new AnalyticsWebService(options);
    return this.instance;
  }

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
