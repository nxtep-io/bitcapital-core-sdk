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
const base_1 = require("./base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class AddressWebService extends base_1.NestedModelWebService {
    constructor(options) {
        super(options);
        this.options = options;
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new AddressWebService(options);
        return this.instance;
    }
    /**
     * Find all Addresses from a Consumer.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/consumers/${userId}/addresses`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.Address(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an Address based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param addressId The Address ID.
     */
    findOne(userId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${userId}/addresses/${addressId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Address(response.data);
        });
    }
    /**
     * Create a new Address in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param address The Address schema.
     */
    create(userId, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/addresses`, address);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Address(response.data);
        });
    }
    /**
     * Partially update an existing Address.
     *
     * @param userId The Consumer's User ID.
     * @param addressId The Address ID.
     * @param address The partial Address schema.
     */
    update(userId, addressId, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/addresses/${addressId}`, address);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Address(response.data);
        });
    }
    /**
     * Delete an Address from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param addressId The Address ID.
     */
    delete(userId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/consumers/${userId}/addresses/${addressId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.AddressWebService = AddressWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzc1dlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQWRkcmVzc1dlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUE2RTtBQUM3RSxzQ0FBbUQ7QUFDbkQsb0NBQXNFO0FBSXRFLHVCQUErQixTQUFRLDRCQUE2QztJQUdsRixZQUErQixPQUFpQztRQUM5RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEYyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtJQUVoRSxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWlDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDekQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLE1BQU0sWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFMUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLGdCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3RSxPQUFPLHNCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxPQUFPLENBQUMsTUFBYyxFQUFFLFNBQWlCOztZQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsTUFBTSxjQUFjLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFFcEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksZ0JBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQXNCOztZQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsTUFBTSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFakYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksZ0JBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxTQUFpQixFQUFFLE9BQStCOztZQUNwRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsTUFBTSxjQUFjLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTlGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGdCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxTQUFpQjs7WUFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLE1BQU0sY0FBYyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRXZGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQW5HRCw4Q0FtR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2UsIE5lc3RlZE1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBBZGRyZXNzU2NoZW1hLCBBZGRyZXNzIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xuaW1wb3J0IHsgUGFnaW5hdGlvbiwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc1dlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgQWRkcmVzc1dlYlNlcnZpY2UgZXh0ZW5kcyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2U8QWRkcmVzcywgQWRkcmVzc1NjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBBZGRyZXNzV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQWRkcmVzc1dlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEFkZHJlc3NXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBBZGRyZXNzV2ViU2VydmljZU9wdGlvbnMpOiBBZGRyZXNzV2ViU2VydmljZSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBBZGRyZXNzV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBBZGRyZXNzZXMgZnJvbSBhIENvbnN1bWVyLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBwYWdpbmF0aW9uIFRoZSBwYWdpbmF0aW9uIHBhcmFtZXRlcnMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbCh1c2VySWQ6IHN0cmluZywgcGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8QWRkcmVzcz4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vYWRkcmVzc2VzYCwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBBZGRyZXNzU2NoZW1hKSA9PiBuZXcgQWRkcmVzcyhpdGVtKSk7XG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbiBBZGRyZXNzIGJhc2VkIG9uIGl0J3MgSUQuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIGFkZHJlc3NJZCBUaGUgQWRkcmVzcyBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKHVzZXJJZDogc3RyaW5nLCBhZGRyZXNzSWQ6IHN0cmluZyk6IFByb21pc2U8QWRkcmVzcz4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vYWRkcmVzc2VzLyR7YWRkcmVzc0lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBZGRyZXNzKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBBZGRyZXNzIGluIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gYWRkcmVzcyBUaGUgQWRkcmVzcyBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXJJZDogc3RyaW5nLCBhZGRyZXNzOiBBZGRyZXNzU2NoZW1hKTogUHJvbWlzZTxBZGRyZXNzPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vYWRkcmVzc2VzYCwgYWRkcmVzcyk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFkZHJlc3MocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBBZGRyZXNzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBhZGRyZXNzSWQgVGhlIEFkZHJlc3MgSUQuXG4gICAqIEBwYXJhbSBhZGRyZXNzIFRoZSBwYXJ0aWFsIEFkZHJlc3Mgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgYWRkcmVzc0lkOiBzdHJpbmcsIGFkZHJlc3M6IFBhcnRpYWw8QWRkcmVzc1NjaGVtYT4pOiBQcm9taXNlPEFkZHJlc3M+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9hZGRyZXNzZXMvJHthZGRyZXNzSWR9YCwgYWRkcmVzcyk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFkZHJlc3MocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGFuIEFkZHJlc3MgZnJvbSB0aGUgcGxhdGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIGFkZHJlc3NJZCBUaGUgQWRkcmVzcyBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZWxldGUodXNlcklkOiBzdHJpbmcsIGFkZHJlc3NJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvY29uc3VtZXJzLyR7dXNlcklkfS9hZGRyZXNzZXMvJHthZGRyZXNzSWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19