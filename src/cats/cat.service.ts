import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
    private readonly cats: string[] = ['Tom', 'Garfield', 'Sylvester'];

    getCats(): string[] {
        return this.cats;
    }
}
