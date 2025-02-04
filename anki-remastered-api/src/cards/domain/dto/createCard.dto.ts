import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
    
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsString()
    answer: string;

    @IsNotEmpty()
    @IsString()
    tag: string;

    constructor(question: string, answer: string, tag: string) {
        this.question = question;
        this.answer = answer;
        this.tag = tag;
      }
}
