"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModelWebService_1 = require("./base/BaseModelWebService");
exports.BaseModelWebService = BaseModelWebService_1.default;
var AssetWebService_1 = require("./AssetWebService");
exports.AssetWebService = AssetWebService_1.default;
var ConsumerWebService_1 = require("./ConsumerWebService");
exports.ConsumerWebService = ConsumerWebService_1.default;
var DomainWebService_1 = require("./DomainWebService");
exports.DomainWebService = DomainWebService_1.default;
var OAuthWebService_1 = require("./OAuthWebService");
exports.OAuthWebService = OAuthWebService_1.default;
var UserWebService_1 = require("./UserWebService");
exports.UserWebService = UserWebService_1.default;
var WalletWebService_1 = require("./WalletWebService");
exports.WalletWebService = WalletWebService_1.default;
var PaymentWebService_1 = require("./PaymentWebService");
exports.PaymentWebService = PaymentWebService_1.default;
__export(require("./BankingWebService"));
__export(require("./request"));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBNEU7QUFBbkUsb0RBQUEsT0FBTyxDQUF1QjtBQUV2QyxxREFBK0Q7QUFBdEQsNENBQUEsT0FBTyxDQUFtQjtBQUNuQywyREFBcUU7QUFBNUQsa0RBQUEsT0FBTyxDQUFzQjtBQUN0Qyx1REFBaUU7QUFBeEQsOENBQUEsT0FBTyxDQUFvQjtBQUNwQyxxREFBdUY7QUFBOUUsNENBQUEsT0FBTyxDQUFtQjtBQUNuQyxtREFBNkQ7QUFBcEQsMENBQUEsT0FBTyxDQUFrQjtBQUNsQyx1REFBaUU7QUFBeEQsOENBQUEsT0FBTyxDQUFvQjtBQUNwQyx5REFBbUU7QUFBMUQsZ0RBQUEsT0FBTyxDQUFxQjtBQUVyQyx5Q0FBb0M7QUFFcEMsK0JBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgZGVmYXVsdCBhcyBCYXNlTW9kZWxXZWJTZXJ2aWNlIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFzc2V0V2ViU2VydmljZSB9IGZyb20gXCIuL0Fzc2V0V2ViU2VydmljZVwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbnN1bWVyV2ViU2VydmljZSB9IGZyb20gXCIuL0NvbnN1bWVyV2ViU2VydmljZVwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIERvbWFpbldlYlNlcnZpY2UgfSBmcm9tIFwiLi9Eb21haW5XZWJTZXJ2aWNlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vT0F1dGhXZWJTZXJ2aWNlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlcldlYlNlcnZpY2UgfSBmcm9tIFwiLi9Vc2VyV2ViU2VydmljZVwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFdhbGxldFdlYlNlcnZpY2UgfSBmcm9tIFwiLi9XYWxsZXRXZWJTZXJ2aWNlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF5bWVudFdlYlNlcnZpY2UgfSBmcm9tIFwiLi9QYXltZW50V2ViU2VydmljZVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vQmFua2luZ1dlYlNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL3JlcXVlc3RcIjtcclxuIl19