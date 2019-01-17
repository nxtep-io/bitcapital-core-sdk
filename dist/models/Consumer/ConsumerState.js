"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const _1 = require(".");
class ConsumerState extends __1.BaseModel {
    constructor(data = {}) {
        super(data);
        Object.assign(this, data);
        this.consumer = data.consumer && new _1.Consumer(data.consumer);
    }
}
exports.ConsumerState = ConsumerState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXJTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQ29uc3VtZXJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUErQjtBQUMvQix3QkFBNkM7QUFRN0MsbUJBQTJCLFNBQVEsYUFBUztJQUsxQyxZQUFZLE9BQXFDLEVBQUU7UUFDakQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksV0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Y7QUFaRCxzQ0FZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgQ29uc3VtZXIsIENvbnN1bWVyU3RhdHVzIH0gZnJvbSBcIi5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb25zdW1lclN0YXRlU2NoZW1hIHtcbiAgY29uc3VtZXI6IENvbnN1bWVyO1xuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzO1xuICBhZGRpdGlvbmFsRGF0YT86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnN1bWVyU3RhdGUgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBDb25zdW1lclN0YXRlU2NoZW1hIHtcbiAgY29uc3VtZXI6IENvbnN1bWVyO1xuICBzdGF0dXM6IENvbnN1bWVyU3RhdHVzO1xuICBhZGRpdGlvbmFsRGF0YT86IGFueTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPENvbnN1bWVyU3RhdGVTY2hlbWE+ID0ge30pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLmNvbnN1bWVyID0gZGF0YS5jb25zdW1lciAmJiBuZXcgQ29uc3VtZXIoZGF0YS5jb25zdW1lcik7XG4gIH1cbn1cbiJdfQ==