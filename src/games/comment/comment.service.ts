import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from '../entities/comment.entity';
import { UserService } from '../../auth/user/user.service';
import { GameService } from '../game/game.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private readonly userService: UserService,
        private readonly gameService: GameService,
    ) {}

    findAll() {
        return this.commentRepository.find();
    }

    findOne(id: number) {
        return this.commentRepository.findOneBy({ id });
    }

    async update(id: number, updateCommentDto: UpdateCommentDto) {
        await this.commentRepository.update(id, updateCommentDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.commentRepository.delete(id);
        if (result.affected) {
            return { message: `Comment deleted` };
        }
        return null;
    }
    //más dificl porque tenemos que validar que el userId y gameId existan antes de crear el comentario, por eso inyectamos los servicios de User y Game para hacer esas validaciones
    async create(createCommentDto: CreateCommentDto) {
        const user = await this.userService.findById(createCommentDto.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const game = await this.gameService.findOne(createCommentDto.gameId);
        if (!game) {
            throw new Error('Game not found');
        }
        const newComment = this.commentRepository.create({
            ...createCommentDto,
            user,
            game,
        });
        return this.commentRepository.save(newComment);
    }
}
