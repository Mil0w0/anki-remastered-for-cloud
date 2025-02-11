import {Injectable, BadRequestException} from '@nestjs/common';
import {LocalDateUtils} from "../local.date.utils";

@Injectable()
export class DateService {

    /**
     * Parse a date from a string
     */
    parseDate(date?: string): Date {
        if (!date) {
            return LocalDateUtils.today();
        }
        return LocalDateUtils.fromString(date);
    }
}
