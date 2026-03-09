import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) {}

    findAll() {
        return this.rolesRepository.find();
    }

    findOne(id: number) {
        return this.rolesRepository.findOneBy({ id });
    }

    findByName(name: string) {
        return this.rolesRepository.findOneBy({ name });
    }

    async create(createRoleDto: CreateRoleDto) {
        return this.rolesRepository.save(createRoleDto);
    }

    async Update(id: number, updateRoleDto: UpdateRoleDto) {
        await this.rolesRepository.update(id, updateRoleDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.rolesRepository.delete(id);
        if (result.affected) {
            return { message: `Role deleted` };
        }
        return null;
    }
}
