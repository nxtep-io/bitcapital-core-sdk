"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LIMIT = 25;
/**
 * The extended Array with the pagination data.
 */
class PaginatedArray extends Array {
}
exports.PaginatedArray = PaginatedArray;
class PaginationUtil {
    /**
     * Merge the response data with pagination headers.
     *
     * @param data The input array data
     * @param headers The map of the response headers
     */
    static parse(data = [], headers = {}) {
        data.dataLength = headers["x-data-length"] ? parseInt(headers["x-data-length"], exports.DEFAULT_LIMIT) : undefined;
        data.dataSkip = headers["x-data-skip"] ? parseInt(headers["x-data-skip"], exports.DEFAULT_LIMIT) : undefined;
        data.dataLimit = headers["x-data-limit"] ? parseInt(headers["x-data-limit"], exports.DEFAULT_LIMIT) : undefined;
        return data;
    }
}
exports.PaginationUtil = PaginationUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlscy9QYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBMEJoQzs7R0FFRztBQUNILG9CQUErQixTQUFRLEtBQVE7Q0FJOUM7QUFKRCx3Q0FJQztBQUVEO0lBQ0U7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFJLE9BQTBCLEVBQUUsRUFBRSxVQUFlLEVBQUU7UUFDcEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUscUJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0csSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUscUJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDckcsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUscUJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDeEcsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFiRCx3Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBERUZBVUxUX0xJTUlUID0gMjU7XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBmb3IgaGFuZGxpbmcgc2ltcGxlIHBhZ2luYXRpb24gb3B0aW9ucy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBQYWdpbmF0aW9uIHtcclxuICAvKipcclxuICAgKiBUaGUgY291bnQgb2YgaXRlbXMgdG8gc2tpcCBpbiB0aGUgc3RhcnQgb2YgdGhlIHJlc3VsdHMuXHJcbiAgICovXHJcbiAgc2tpcD86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvdW50IG9mIGl0ZW1zIGluIGVhY2ggcGFnZSBvZiB0aGUgcmVzdWx0cy5cclxuICAgKi9cclxuICBsaW1pdD86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhZ2luYXRpb24gZGF0YSBmb3IgZXh0ZW5kaW5nIHRoZSBBcnJheS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFnaW5hdGlvbkRhdGEge1xyXG4gIGRhdGFMZW5ndGg/OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0PzogbnVtYmVyO1xyXG4gIGRhdGFTa2lwPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGV4dGVuZGVkIEFycmF5IHdpdGggdGhlIHBhZ2luYXRpb24gZGF0YS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYWdpbmF0ZWRBcnJheTxUPiBleHRlbmRzIEFycmF5PFQ+IGltcGxlbWVudHMgUGFnaW5hdGlvbkRhdGEge1xyXG4gIGRhdGFMZW5ndGg/OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0PzogbnVtYmVyO1xyXG4gIGRhdGFTa2lwPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvblV0aWwge1xyXG4gIC8qKlxyXG4gICAqIE1lcmdlIHRoZSByZXNwb25zZSBkYXRhIHdpdGggcGFnaW5hdGlvbiBoZWFkZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgVGhlIGlucHV0IGFycmF5IGRhdGFcclxuICAgKiBAcGFyYW0gaGVhZGVycyBUaGUgbWFwIG9mIHRoZSByZXNwb25zZSBoZWFkZXJzXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBwYXJzZTxUPihkYXRhOiBQYWdpbmF0ZWRBcnJheTxUPiA9IFtdLCBoZWFkZXJzOiBhbnkgPSB7fSk6IFBhZ2luYXRlZEFycmF5PFQ+IHtcclxuICAgIGRhdGEuZGF0YUxlbmd0aCA9IGhlYWRlcnNbXCJ4LWRhdGEtbGVuZ3RoXCJdID8gcGFyc2VJbnQoaGVhZGVyc1tcIngtZGF0YS1sZW5ndGhcIl0sIERFRkFVTFRfTElNSVQpIDogdW5kZWZpbmVkO1xyXG4gICAgZGF0YS5kYXRhU2tpcCA9IGhlYWRlcnNbXCJ4LWRhdGEtc2tpcFwiXSA/IHBhcnNlSW50KGhlYWRlcnNbXCJ4LWRhdGEtc2tpcFwiXSwgREVGQVVMVF9MSU1JVCkgOiB1bmRlZmluZWQ7XHJcbiAgICBkYXRhLmRhdGFMaW1pdCA9IGhlYWRlcnNbXCJ4LWRhdGEtbGltaXRcIl0gPyBwYXJzZUludChoZWFkZXJzW1wieC1kYXRhLWxpbWl0XCJdLCBERUZBVUxUX0xJTUlUKSA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxufVxyXG4iXX0=