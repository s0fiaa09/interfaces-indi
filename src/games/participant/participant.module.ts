import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Participant } from '../entities/participant.entity';
import { ParticipantService } from './participant.service';

@Module({
    imports: [TypeOrmModule.forFeature([Participant])],
    providers: [ParticipantService],
    exports: [ParticipantService],
})
export class ParticipantModule {}
