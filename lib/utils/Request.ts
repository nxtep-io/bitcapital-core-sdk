import * as CryptoJS from "crypto-js";

export interface RequestSigningHeaders {
  "X-Request-Signature": string;
  "X-Request-Timestamp": string;
}

export default class RequestUtil {
  /**
   * Generates headers for request signing.
   */
  public static sign(secret: string, req: { method: string; url: string; body?: string }): RequestSigningHeaders {
    const now = Date.now();
    const payload = [req.method, req.url, now];

    // Check if should sign body as well
    if (req.method.toUpperCase() === "POST" || req.method.toUpperCase() === "PUT") {
      payload.push(req.body);
    }

    // Generate signature using HMAC SHA 256
    const signature = CryptoJS.HmacSHA256(payload.join(","), secret);

    return {
      "X-Request-Signature": signature.toString(),
      "X-Request-Timestamp": now.toString()
    };
  }
}
