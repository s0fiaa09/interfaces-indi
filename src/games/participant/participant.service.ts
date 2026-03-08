import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Participant } from '../entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
    ) {}

    findAll() {
        return this.participantRepository.find();
    }

    async Update(id: number, updateParticipantDto: UpdateParticipantDto) {
        await this.participantRepository.update(id, updateParticipantDto);
        return this.participantRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.participantRepository.delete(id);
        if (result.affected) {
            return { message: `Participant deleted` };
        }
        return null;
    }

    async create(createParticipantDto: CreateParticipantDto) {
        const { sessionId, userId, ...rest } = createParticipantDto;
        const participant = this.participantRepository.create({
            ...rest,
            session: { id: sessionId } as any,
            user: { id: userId } as any,
        });
        return this.participantRepository.save(participant);
    }
}
