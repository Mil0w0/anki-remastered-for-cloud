import {IsBoolean, IsDate, IsNotEmpty, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import {LocalDateUtils} from "../../../utils/local.date.utils";

export class AnswerCardDto {

    @IsNotEmpty()
    @IsBoolean()
    isValid: boolean;

    @IsOptional()
    @IsDate()
    quizzDate?: Date;

    constructor(isValid: boolean) {
        this.isValid = isValid;
    }
}