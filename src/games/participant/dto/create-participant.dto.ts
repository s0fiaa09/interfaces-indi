export class CreateParticipantDto {
    score: number;
    position: number;
    isWinner: boolean;
    sessionId: number; // foreign key de session
    userId: number; // foreign key de user
}
