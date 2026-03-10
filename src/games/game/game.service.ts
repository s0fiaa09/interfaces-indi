import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '@/auth/user/user.service';

import { Game } from '../entities/game.entity';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        private readonly userService: UserService,
    ) {}

    findAll() {
        return this.gameRepository.find();
    }

    findOne(id: number) {
        return this.gameRepository.findOneBy({ id });
    }

    async update(id: number, updateGameDto: UpdateGameDto) {
        await this.gameRepository.update(id, updateGameDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.gameRepository.delete(id);
        if (result.affected) {
            return { message: `Game deleted` };
        }
        return null;
    }

    async create(createGameDto: CreateGameDto) {
        const user = await this.userService.findById(createGameDto.createdById);
        if (!user) {
            throw new Error('User not found');
        }

        const game = this.gameRepository.create({
            ...createGameDto,
            createdBy: user,
        });

        return this.gameRepository.save(game);
    }
}
