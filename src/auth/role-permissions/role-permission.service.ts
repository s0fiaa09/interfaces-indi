import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permissions/permission.service';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rpRepository: Repository<RolePermission>,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,
    ) {}

    findAll() {
        return this.rpRepository.find();
    }

    findOne(id: number) {
        return this.rpRepository.findOneBy({ id });
    }

    async create(createDto: CreateRolePermissionDto) {
        const role = await this.roleService.findOne(createDto.roleId);
        if (!role) {
            throw new Error('Role not found');
        }
        const permission = await this.permissionService.findOne(createDto.permissionId);
        if (!permission) {
            throw new Error('Permission not found');
        }
        const rp = this.rpRepository.create({ role, permission });
        return this.rpRepository.save(rp);
    }

    async update(id: number, updateDto: UpdateRolePermissionDto) {
        // Primero buscamos el registro existente
        const rp = await this.findOne(id);
        if (!rp) throw new Error('RolePermission not found');

        if (updateDto.roleId) {
            const role = await this.roleService.findOne(updateDto.roleId);
            if (!role) throw new Error('Role not found');
            rp.role = role; // modificamos directamente la entidad encontrada
        }

        if (updateDto.permissionId) {
            const permission = await this.permissionService.findOne(updateDto.permissionId);
            if (!permission) throw new Error('Permission not found');
            rp.permission = permission; // igual aquí
        }

        return this.rpRepository.save(rp); // save() maneja tanto crear como actualizar
    }

    async remove(id: number) {
        const result = await this.rpRepository.delete(id);
        if (result.affected) {
            return { message: `RolePermission deleted` };
        }
        return null;
    }
}
