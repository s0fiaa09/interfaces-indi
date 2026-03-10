import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    findAll() {
        return this.roleRepository.find();
    }

    //lo mismo que usar this.roleRepository.findOneBy({ id }); pero mas practico, se le pasa el id como parametro y se retorna el rol encontrado o null si no se encuentra, se puede reutilizar en otros metodos del servicio
    findOne(id: number) {
        return this.roleRepository.findOneBy({ id });
    }

    //usado para el create
    findByName(name: string) {
        return this.roleRepository.findOneBy({ name });
    }

    async create(createRoleDto: CreateRoleDto) {
        const existing = await this.findByName(createRoleDto.name);
        if (existing) {
            throw new Error(`Role with this name already exists`);
        }
        return this.roleRepository.save(createRoleDto);
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        await this.roleRepository.update(id, updateRoleDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.roleRepository.delete(id);
        if (result.affected) {
            return { message: `Role deleted` };
        }
        return null;
    }
}
