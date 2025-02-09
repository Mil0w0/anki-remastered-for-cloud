import {IsBoolean, IsNotEmpty} from "class-validator";

export class AnswerCardDto {

    @IsNotEmpty()
    @IsBoolean()
    isValid: boolean;

    constructor(isValid: boolean) {
        this.isValid = isValid;
    }
}