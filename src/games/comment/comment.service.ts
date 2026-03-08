import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    findAll() {
        return this.commentRepository.find();
    }

    async Update(id: number, updateCommentDto: UpdateCommentDto) {
        await this.commentRepository.update(id, updateCommentDto);
        return this.commentRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.commentRepository.delete(id);
        if (result.affected) {
            return { message: `Comment deleted` };
        }
        return null;
    }

    async create(createCommentDto: CreateCommentDto) {
        const { gameId, userId, ...rest } = createCommentDto;
        const comment = this.commentRepository.create({
            ...rest,
            game: { id: gameId } as any,
            user: { id: userId } as any,
        });
        return this.commentRepository.save(comment);
    }
}
