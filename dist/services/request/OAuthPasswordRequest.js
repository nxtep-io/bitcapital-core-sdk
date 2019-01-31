"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OAuthPasswordRequest {
    constructor(username, password, scope) {
        this.grant_type = "password";
        this.username = username;
        this.password = password;
        this.scope = scope;
    }
}
exports.default = OAuthPasswordRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhQYXNzd29yZFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc2VydmljZXMvcmVxdWVzdC9PQXV0aFBhc3N3b3JkUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLG9CQUFvQjtJQU12QyxZQUFZLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxLQUFjO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQVpELHVDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhQYXNzd29yZFJlcXVlc3Qge1xyXG4gIGdyYW50X3R5cGU6IHN0cmluZztcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgc2NvcGU/OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIHNjb3BlPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdyYW50X3R5cGUgPSBcInBhc3N3b3JkXCI7XHJcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==