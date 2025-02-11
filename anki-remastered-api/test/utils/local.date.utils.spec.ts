import {LocalDateUtils} from "../../src/utils/local.date.utils";

describe('LocalDateUtils', () => {
    describe('today', () => {
        it('should return a Date object set to today at local midnight', () => {
            const result = LocalDateUtils.today();

            const now = new Date();
            const expected = new Date(now.toLocaleDateString());

            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe('yesterday', () => {
        it('should return a Date object set to yesterday at local midnight', () => {
            const result = LocalDateUtils.yesterday();

            // Create a reference Date that represents *yesterday* at local midnight
            const now = new Date();
            now.setDate(now.getDate() - 1);
            const expected = new Date(now.toLocaleDateString());

            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe('daysAgo', () => {
        it('should return a Date object set to X days ago at local midnight', () => {
            const days = 5;
            const result = LocalDateUtils.daysAgo(days);

            // Create a reference Date that represents 5 days ago at local midnight
            const now = new Date();
            now.setDate(now.getDate() - days);
            const expected = new Date(now.toLocaleDateString());

            expect(result.getTime()).toBe(expected.getTime());

            // Test the case where days = 0
            const resultToday = LocalDateUtils.daysAgo(0);
            const expectedToday = LocalDateUtils.today();
            expect(resultToday.getTime()).toBe(expectedToday.getTime());

            // Test the case where days = 1
            const resultYesterday = LocalDateUtils.daysAgo(1);
            const expectedYesterday = LocalDateUtils.yesterday();
            expect(resultYesterday.getTime()).toBe(expectedYesterday.getTime());
        });
    });

    describe('tomorrow', () => {
        it('should return a Date object set to tomorrow at local midnight', () => {
            const result = LocalDateUtils.tomorrow();
            const now = new Date();
            now.setDate(now.getDate() + 1);
            const expected = new Date(now.toLocaleDateString());
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe('daysAhead', () => {
        it('should return a Date object set to X days in the future at local midnight', () => {
            const days = 3;
            const result = LocalDateUtils.daysAhead(days);
            const now = new Date();
            now.setDate(now.getDate() + days);
            const expected = new Date(now.toLocaleDateString());
            expect(result.getTime()).toBe(expected.getTime());
        });

        it('should return today if days = 0', () => {
            const result = LocalDateUtils.daysAhead(0);
            const expected = LocalDateUtils.today();
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe('subtractDays', () => {
        it('should subtract the given number of days from the provided date', () => {
            const baseDate = new Date("2025-02-15T00:00:00");
            const daysToSubtract = 10;
            const result = LocalDateUtils.subtractDays(baseDate, daysToSubtract);
            const expected = new Date(baseDate);
            expected.setDate(baseDate.getDate() - daysToSubtract);
            expect(result.getTime()).toBe(expected.getTime());
        });

        it('should return the same date if days to subtract is 0', () => {
            const baseDate = new Date("2025-02-15T00:00:00");
            const result = LocalDateUtils.subtractDays(baseDate, 0);
            expect(result.getTime()).toBe(baseDate.getTime());
        });
    });

    describe('getLocalDate', () => {
        it('should return a new Date set to the local date portion of the provided date', () => {
            const dateWithTime = new Date("2025-02-15T13:45:00");
            const localDate = LocalDateUtils.getLocalDate(dateWithTime);
            const expected = new Date(dateWithTime.toLocaleDateString());
            expect(localDate.getTime()).toBe(expected.getTime());
        });

        it('should not include time information', () => {
            const dateWithTime = new Date("2025-12-31T23:59:59");
            const localDate = LocalDateUtils.getLocalDate(dateWithTime);
            // The time should be reset to midnight
            expect(localDate.getHours()).toBe(0);
            expect(localDate.getMinutes()).toBe(0);
            expect(localDate.getSeconds()).toBe(0);
        });
    });

    describe('getLocalISOString', () => {
        it('should return an ISO string representation of the local date at midnight', () => {
            const dateWithTime = new Date("2025-02-15T13:45:00");
            const localDate = LocalDateUtils.getLocalDate(dateWithTime);
            const isoString = LocalDateUtils.getLocalISOString(dateWithTime);
            expect(isoString).toBe(localDate.toISOString());
        });
    });

    describe('fromString', () => {
        it('should parse a date string into a local Date at midnight', () => {
            const dateStr = "2025-02-15T13:45:00Z";
            const result = LocalDateUtils.fromString(dateStr);
            const expected = new Date(new Date(dateStr).toLocaleDateString());
            expect(result.getTime()).toBe(expected.getTime());
        });

        it('should ignore the time portion of the input string', () => {
            const dateStr = "2025-02-15T23:59:59";
            const result = LocalDateUtils.fromString(dateStr);
            const expected = new Date(new Date(dateStr).toLocaleDateString());
            expect(result.getTime()).toBe(expected.getTime());
        });

        it('should handle ISO date strings without time component', () => {
            const dateStr = "2025-02-15";

            const result = LocalDateUtils.fromString(dateStr);

            expect(result.getHours()).toBe(0);
            expect(result.getMinutes()).toBe(0);
            expect(result.getSeconds()).toBe(0);

            expect(result.getFullYear()).toBe(2025);
            expect(result.getMonth()).toBe(1);
            expect(result.getDate()).toBe(15);
        });
    });
});
