import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RolesModule } from './roles/role.module';
import { PermissionModule } from './permissions/permission.module';
import { RolePermissionModule } from './role-permissions/role-permission.module';

@Module({
    imports: [UserModule, RolesModule, PermissionModule, RolePermissionModule],
})
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
    imports: [UserModule, RoleModule],
})
export class AuthModule {}
