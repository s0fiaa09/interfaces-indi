import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    findAll() {
        return this.permissionRepository.find();
    }

    findOne(id: number) {
        return this.permissionRepository.findOneBy({ id });
    }

    async create(createPermissionDto: CreatePermissionDto) {
        return this.permissionRepository.save(createPermissionDto);
    }

    async Update(id: number, updatePermissionDto: UpdatePermissionDto) {
        await this.permissionRepository.update(id, updatePermissionDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.permissionRepository.delete(id);
        if (result.affected) {
            return { message: `Permission deleted` };
        }
        return null;
    }
}
