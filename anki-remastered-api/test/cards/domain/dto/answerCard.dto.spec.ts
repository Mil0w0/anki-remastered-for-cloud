import {validate} from 'class-validator';
import {AnswerCardDto} from '../../../../src/cards/domain/dto/answerCard.dto';
import {LocalDateUtils} from "../../../../src/utils/local.date.utils";

describe('AnswerCardDto', () => {
    it('should validate successfully with a boolean value', async () => {
        const dto = new AnswerCardDto(true);
        const errors = await validate(dto);

        expect(errors).toHaveLength(0); // No errors expected
    });

    it('should fail validation if isValid is missing', async () => {
        const dto = new AnswerCardDto(undefined as any);
        const errors = await validate(dto);

        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('isValid');
    });

    it('should fail validation if isValid is not a boolean', async () => {
        const dto = new AnswerCardDto('notABoolean' as any);
        const errors = await validate(dto);

        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('isValid');
    });

    it('should validate successfully with isValid and date value', async () => {
        const dto = new AnswerCardDto(true);
        dto.quizzDate = LocalDateUtils.today();
        const errors = await validate(dto);

        expect(errors).toHaveLength(0); // No errors expected
    })
});
