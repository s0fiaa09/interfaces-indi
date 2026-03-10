import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permissions/permission.module';

import { RolePermissionService } from './role-permission.service';
import { RolePermissionsController } from './role-permissions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RolePermission]), RoleModule, PermissionModule],
    providers: [RolePermissionService],
    exports: [RolePermissionService],
    controllers: [RolePermissionsController],
})
export class RolePermissionModule {}
