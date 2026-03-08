import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Session } from '../entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
    ) {}

    findAll() {
        return this.sessionRepository.find();
    }

    async Update(id: number, updateSessionDto: UpdateSessionDto) {
        await this.sessionRepository.update(id, updateSessionDto);
        return this.sessionRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.sessionRepository.delete(id);
        if (result.affected) {
            return { message: `Session deleted` };
        }
        return null;
    }

    async create(createSessionDto: CreateSessionDto) {
        const { gameId, hostId, ...rest } = createSessionDto;
        const session = this.sessionRepository.create({
            ...rest,
            game: { id: gameId } as any,
            host: { id: hostId } as any,
        });
        return this.sessionRepository.save(session);
    }
}
