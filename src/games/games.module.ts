import { Module } from '@nestjs/common';

import { GameModule } from './game/game.module';
import { SessionModule } from './session/session.module';
import { ParticipantModule } from './participant/participant.module';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';

@Module({
    imports: [GameModule, SessionModule, ParticipantModule, CommentModule],
    exports: [GameModule, SessionModule, ParticipantModule, CommentModule],
    controllers: [CommentController],
})
export class GamesModule {}
