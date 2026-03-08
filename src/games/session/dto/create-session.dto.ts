import { SessionStatus } from '../entities/session.entity';

export class CreateSessionDto {
    gameId: number;
    hostId: number;
    notes?: string;
    status?: SessionStatus;
}
