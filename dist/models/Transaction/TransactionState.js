"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
class TransactionState extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        Object.assign(this, data);
        this.consumer = data.consumer && new _1.Transaction(data.consumer);
    }
}
exports.TransactionState = TransactionState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb25TdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvVHJhbnNhY3Rpb24vVHJhbnNhY3Rpb25TdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUFtRDtBQUNuRCwwQkFBK0I7QUFRL0Isc0JBQThCLFNBQVEsYUFBUztJQUs3QyxZQUFZLE9BQXdDLEVBQUU7UUFDcEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksY0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0Y7QUFaRCw0Q0FZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvblN0YXR1cyB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tIFwiLi5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2FjdGlvblN0YXRlU2NoZW1hIHtcbiAgY29uc3VtZXI6IFRyYW5zYWN0aW9uO1xuICBzdGF0dXM6IFRyYW5zYWN0aW9uU3RhdHVzO1xuICBhZGRpdGlvbmFsRGF0YT86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uU3RhdGUgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBUcmFuc2FjdGlvblN0YXRlU2NoZW1hIHtcbiAgY29uc3VtZXI6IFRyYW5zYWN0aW9uO1xuICBzdGF0dXM6IFRyYW5zYWN0aW9uU3RhdHVzO1xuICBhZGRpdGlvbmFsRGF0YT86IGFueTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFRyYW5zYWN0aW9uU3RhdGVTY2hlbWE+ID0ge30pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLmNvbnN1bWVyID0gZGF0YS5jb25zdW1lciAmJiBuZXcgVHJhbnNhY3Rpb24oZGF0YS5jb25zdW1lcik7XG4gIH1cbn1cbiJdfQ==