import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '@/auth/user/user.service';

import { Session } from '../entities/session.entity';
import { GameService } from '../game/game.service';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        private readonly userService: UserService,
        private readonly gameService: GameService,
    ) {}

    findAll() {
        return this.sessionRepository.find();
    }

    findOne(id: number) {
        return this.sessionRepository.findOneBy({ id });
    }

    async update(id: number, updateSessionDto: UpdateSessionDto) {
        await this.sessionRepository.update(id, updateSessionDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.sessionRepository.delete(id);
        if (result.affected) {
            return { message: `Session deleted` };
        }
        return null;
    }

    async create(createSessionDto: CreateSessionDto) {
        const host = await this.userService.findById(createSessionDto.hostId);
        if (!host) {
            throw new Error('Host not found');
        }

        const game = await this.gameService.findOne(createSessionDto.gameId);
        if (!game) {
            throw new Error('Game not found');
        }
        const newSession = this.sessionRepository.create({
            ...createSessionDto,
            host,
            game,
        });
        return this.sessionRepository.save(newSession);
    }
}
