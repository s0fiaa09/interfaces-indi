import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'; // se agrega auto al crear el repositorio
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity'; // se agrega auto al crear la entidad, se importa para usarlo en el repositorio
import { RoleService } from '../role/role.service'; // se importa para usarlo en el servicio de usuarios

import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        // dependecia del repositorio de usuarios
        @InjectRepository(User) // espicificar que repositorio se va a inyectar
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
    ) {}

    findAll() {
        return this.userRepository.find();
    }

    //metodo para actualizar un usuario, se le pasa el id del usuario a actualizar y un DTO con los datos a actualizar, se actualiza el usuario en la base de datos y se retorna el usuario actualizado
    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.findById(id); //el findOne de user
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected) {
            return { message: `User deleted` };
        }
        return null;
    }

    async create(createUserDto: CreateUserDto) {
        // Buscamos el role segun el nombre
        const role = await this.roleService.findByName(createUserDto.roleName);
        if (!role) {
            throw new Error('Role not found');
        }
        // Transfomar del DTO al User
        const newUser = this.userRepository.create({
            ...createUserDto,
            role,
        });
        return this.userRepository.save(newUser);
    }

    // Buscar un usuario por su id, creado para ser usado en el controlador, se le pasa el id como parametro y se retorna el usuario encontrado o null si no se encuentra
    findById(id: number) {
        return this.userRepository.findOneBy({ id });
    }
}
