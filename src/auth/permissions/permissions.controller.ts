import { Controller, Get, Param } from '@nestjs/common';

import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    FindAll() {
        return this.permissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.permissionService.findOne(+id);
    }
}
