import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from '../entities/permission.entity';

import { PermissionService } from './permission.service';
import { PermissionsController } from './permissions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    providers: [PermissionService],
    exports: [PermissionService],
    controllers: [PermissionsController],
})
export class PermissionModule {}
