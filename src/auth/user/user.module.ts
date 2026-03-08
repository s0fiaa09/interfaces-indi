import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //se agrega

import { User } from '../entities/user.entity'; //se agrega

import { UserService } from './user.service'; // se agrega auto despues de crear el service
import { RolesModule } from '../roles/role.module';

@Module({
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    exports: [UserService],
})
export class UserModule {}
