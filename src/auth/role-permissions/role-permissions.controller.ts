import { Controller, Get, Param } from '@nestjs/common';

import { RolePermissionService } from './role-permission.service';

@Controller('role-permissions')
export class RolePermissionsController {
    constructor(private readonly rpService: RolePermissionService) {}

    @Get()
    findAll() {
        return this.rpService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rpService.findOne(+id);
    }
}
