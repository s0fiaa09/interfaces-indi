import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rpRepository: Repository<RolePermission>,
    ) {}

    findAll() {
        return this.rpRepository.find();
    }

    findOne(id: number) {
        return this.rpRepository.findOneBy({ id });
    }

    async create(createDto: CreateRolePermissionDto) {
        return this.rpRepository.save(createDto);
    }

    async Update(id: number, updateDto: UpdateRolePermissionDto) {
        await this.rpRepository.update(id, updateDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.rpRepository.delete(id);
        if (result.affected) {
            return { message: `RolePermission deleted` };
        }
        return null;
    }
}
