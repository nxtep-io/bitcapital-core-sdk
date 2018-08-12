"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionType_1 = require("./TransactionType");
exports.TransactionType = TransactionType_1.TransactionType;
const __1 = require("..");
class Transaction extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.data = undefined;
        this.type = undefined;
        this.source = undefined;
        this.payments = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
exports.default = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL1RyYW5zYWN0aW9uL1RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQW9EO0FBSzNDLDBCQUxBLGlDQUFlLENBS0E7QUFKeEIsMEJBQWdEO0FBb0JoRCxpQkFBaUMsU0FBUSxhQUFTO0lBTWhELFlBQVksSUFBZ0M7UUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTmQsU0FBSSxHQUE4QixTQUFTLENBQUM7UUFDNUMsU0FBSSxHQUFvQixTQUFTLENBQUM7UUFDbEMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixhQUFRLEdBQWUsU0FBUyxDQUFDO1FBSy9CLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFaRCw4QkFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zYWN0aW9uVHlwZSB9IGZyb20gXCIuL1RyYW5zYWN0aW9uVHlwZVwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4uL1dhbGxldC9XYWxsZXRcIjtcbmltcG9ydCBQYXltZW50IGZyb20gXCIuLi9QYXltZW50L1BheW1lbnRcIjtcblxuZXhwb3J0IHsgVHJhbnNhY3Rpb25UeXBlIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNhY3Rpb25BZGRpdGlvbmFsRGF0YSB7XG4gIGhhc2g/OiBzdHJpbmc7XG4gIGFzc2V0SWQ/OiBzdHJpbmc7XG4gIGFzc2V0Q29kZT86IHN0cmluZztcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgZGF0YTogVHJhbnNhY3Rpb25BZGRpdGlvbmFsRGF0YTtcbiAgdHlwZTogVHJhbnNhY3Rpb25UeXBlO1xuICBzb3VyY2U6IFdhbGxldDtcbiAgcGF5bWVudHM/OiBQYXltZW50W107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zYWN0aW9uIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgVHJhbnNhY3Rpb25TY2hlbWEge1xuICBkYXRhOiBUcmFuc2FjdGlvbkFkZGl0aW9uYWxEYXRhID0gdW5kZWZpbmVkO1xuICB0eXBlOiBUcmFuc2FjdGlvblR5cGUgPSB1bmRlZmluZWQ7XG4gIHNvdXJjZTogV2FsbGV0ID0gdW5kZWZpbmVkO1xuICBwYXltZW50cz86IFBheW1lbnRbXSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFRyYW5zYWN0aW9uU2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xuICB9XG59XG4iXX0=