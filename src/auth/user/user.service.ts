import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'; // se agrega auto al crear el repositorio
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity'; // se agrega auto al crear la entidad, se importa para usarlo en el repositorio

import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/role.service';

@Injectable()
export class UserService {
    constructor(
        // dependecia del repositorio de usuarios
        @InjectRepository(User) // espicificar que repositorio se va a inyectar
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService,
    ) {}

    findAll() {
        return this.userRepository.find();
    }

    async Update(id: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected) {
            return { message: `User deleted` };
        }
        return null;
    }

    async create(createUserDto: CreateUserDto) {
        const role = await this.roleService.findByName(createUserDto.roleName);
        if (!role) {
            throw new Error(`Role not found`);
        }
        const newUser = this.userRepository.create({
            ...createUserDto,
            role,
        });
        return this.userRepository.save(newUser);
    }
}
