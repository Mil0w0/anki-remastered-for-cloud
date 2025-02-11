import {DateService} from "../../../src/utils/services/date.service";
import {LocalDateUtils} from "../../../src/utils/local.date.utils";

describe('DateService', () => {
    let dateService: DateService;

    beforeEach(() => {
        dateService = new DateService();
    });

    describe('parseDate', () => {
        it('should return today\'s date when no argument is provided', () => {
            const today = LocalDateUtils.today();
            const result = dateService.parseDate();
            expect(result).toEqual(today);
        });

        it('should correctly parse a valid ISO date string', () => {
            const dateStr = "2025-02-15";
            const expectedDate = LocalDateUtils.fromString(dateStr);
            const result = dateService.parseDate(dateStr);
            expect(result).toEqual(expectedDate);
        });

        it('should correctly parse a full ISO timestamp string', () => {
            const dateStr = "2025-02-15T13:45:00.000Z";
            const expectedDate = LocalDateUtils.fromString(dateStr);
            const result = dateService.parseDate(dateStr);
            expect(result).toEqual(expectedDate);
        });

        it('should handle edge cases like leap years', () => {
            const dateStr = "2024-02-29"; // Leap year case
            const expectedDate = LocalDateUtils.fromString(dateStr);
            const result = dateService.parseDate(dateStr);
            expect(result).toEqual(expectedDate);
        });
    });
});
