import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Game } from '../entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
    ) {}

    findAll() {
        return this.gameRepository.find();
    }

    async Update(id: number, updateGameDto: UpdateGameDto) {
        await this.gameRepository.update(id, updateGameDto);
        return this.gameRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.gameRepository.delete(id);
        if (result.affected) {
            return { message: `Game deleted` };
        }
        return null;
    }

    async create(createGameDto: CreateGameDto) {
        // if you need to resolve relations (createdBy) you can fetch the user first
        // const user = await this.userService.findOne(createGameDto.createdById);
        // if (!user) throw new Error('User not found');
        return this.gameRepository.save(createGameDto as any);
    }
}
