import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permissions/permission.module';
import { RolePermissionModule } from './role-permissions/role-permission.module';

@Module({
    imports: [UserModule, RoleModule, PermissionModule, RolePermissionModule],
})
export class AuthModule {}
