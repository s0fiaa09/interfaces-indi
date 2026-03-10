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

    //metodo para buscar todos los permisos, se retorna un array de permisos
    findAll() {
        return this.permissionRepository.find();
    }

    //metodo para buscar un permiso por su id, se le pasa el id como parametro y se retorna el permiso encontrado o null si no se encuentra, usado en el controlador
    findOne(id: number) {
        return this.permissionRepository.findOneBy({ id });
    }

    //metodo para crear un nuevo permiso, se le pasa un DTO con los datos del permiso a crear, se verifica que no exista un permiso con el mismo nombre, si existe se lanza un error, si no existe se guarda el nuevo permiso en la base de datos y se retorna el permiso creado
    async create(createPermissionDto: CreatePermissionDto) {
        const existing = await this.findOneByName(createPermissionDto.name);
        if (existing) {
            throw new Error(`Permission with this name already exists`);
        }
        return this.permissionRepository.save(createPermissionDto);
    }
    //metodo para actualizar un permiso, se le pasa el id del permiso a actualizar y un DTO con los datos a actualizar, se actualiza el permiso en la base de datos y se retorna el permiso actualizado
    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        await this.permissionRepository.update(id, updatePermissionDto);
        return this.findOne(id);
    }
    //metodo para eliminar un permiso, se le pasa el id del permiso a eliminar, se elimina el permiso de la base de datos y se retorna un mensaje indicando que el permiso fue eliminado o null si no se encuentra el permiso
    async remove(id: number) {
        const result = await this.permissionRepository.delete(id);
        if (result.affected) {
            return { message: `Permission deleted` };
        }
        return null;
    }

    //metodo para buscar un permiso por su nombre, se le pasa el nombre como parametro y se retorna el permiso encontrado o null si no se encuentra, usado en el metodo de crear permiso para verificar que no exista un permiso con el mismo nombre antes de crear uno nuevo
    findOneByName(name: string) {
        return this.permissionRepository.findOneBy({ name });
    }
}
