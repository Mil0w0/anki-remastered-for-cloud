import {IsBoolean, IsDate, IsNotEmpty, IsOptional} from "class-validator";

export class AnswerCardDto {

    @IsNotEmpty()
    @IsBoolean()
    isValid: boolean;

    @IsDate()
    @IsOptional()
    quizzDate?: Date = new Date();

    constructor(isValid: boolean) {
        this.isValid = isValid;
    }
}