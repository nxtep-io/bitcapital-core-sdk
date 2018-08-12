"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class Payment extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.source = undefined;
        this.transaction = undefined;
        this.recipients = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
exports.default = Payment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvUGF5bWVudC9QYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQWdEO0FBV2hELGFBQTZCLFNBQVEsYUFBUztJQUs1QyxZQUFZLElBQTRCO1FBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUxkLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsZ0JBQVcsR0FBZ0IsU0FBUyxDQUFDO1FBQ3JDLGVBQVUsR0FBZ0IsU0FBUyxDQUFDO1FBS2xDLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFYRCwwQkFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuLi9XYWxsZXQvV2FsbGV0XCI7XG5pbXBvcnQgVHJhbnNhY3Rpb24gZnJvbSBcIi4uL1RyYW5zYWN0aW9uL1RyYW5zYWN0aW9uXCI7XG5pbXBvcnQgUmVjaXBpZW50IGZyb20gXCIuL1JlY2lwaWVudFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBzb3VyY2U6IFdhbGxldDtcbiAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uO1xuICByZWNpcGllbnRzOiBSZWNpcGllbnRbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5bWVudCBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIFBheW1lbnRTY2hlbWEge1xuICBzb3VyY2U6IFdhbGxldCA9IHVuZGVmaW5lZDtcbiAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uID0gdW5kZWZpbmVkO1xuICByZWNpcGllbnRzOiBSZWNpcGllbnRbXSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBheW1lbnRTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gIH1cbn1cbiJdfQ==