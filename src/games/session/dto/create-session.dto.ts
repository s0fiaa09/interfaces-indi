import { SessionStatus } from '@/games/entities/session.entity';

export class CreateSessionDto {
    gameId: number;
    hostId: number;
    notes?: string;
    status?: SessionStatus;
}
