import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '@/auth/user/user.service';

import { Participant } from '../entities/participant.entity';
import { SessionService } from '../session/session.service';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
    ) {}

    findAll() {
        return this.participantRepository.find();
    }

    findOne(id: number) {
        return this.participantRepository.findOneBy({ id });
    }

    async update(id: number, updateParticipantDto: UpdateParticipantDto) {
        await this.participantRepository.update(id, updateParticipantDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.participantRepository.delete(id);
        if (result.affected) {
            return { message: `Participant deleted` };
        }
        return null;
    }

    async create(createparticipantDto: CreateParticipantDto) {
        const user = await this.userService.findById(createparticipantDto.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const session = await this.sessionService.findOne(createparticipantDto.sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        const newParticipant = this.participantRepository.create({
            ...createparticipantDto,
            user,
            session,
        });
        return this.participantRepository.save(newParticipant);
    }
}
