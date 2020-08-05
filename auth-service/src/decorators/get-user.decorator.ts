import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDTO } from "src/models/user.dto";

export const GetUser = createParamDecorator((data, executionContext: ExecutionContext): UserDTO => {
    const req = executionContext.switchToHttp().getRequest();
    return req.user;
})