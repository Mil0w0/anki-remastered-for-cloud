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
});
