import { LocalDateUtils } from "../../src/utils/local.date.utils";

describe("LocalDateUtils", () => {
    describe("today", () => {
        it("should return a Date object set to today at UTC midnight", () => {
            const result = LocalDateUtils.today();

            const now = new Date();
            const expected = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("yesterday", () => {
        it("should return a Date object set to yesterday at UTC midnight", () => {
            const result = LocalDateUtils.yesterday();

            const now = new Date();
            now.setUTCDate(now.getUTCDate() - 1);
            const expected = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("daysAgo", () => {
        it("should return a Date object set to X days ago at UTC midnight", () => {
            const days = 5;
            const result = LocalDateUtils.daysAgo(days);

            const now = new Date();
            now.setUTCDate(now.getUTCDate() - days);
            const expected = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

            expect(result.getTime()).toBe(expected.getTime());
        });

        it("should return today if days = 0", () => {
            const result = LocalDateUtils.daysAgo(0);
            const expected = LocalDateUtils.today();
            expect(result.getTime()).toBe(expected.getTime());
        });

        it("should return yesterday if days = 1", () => {
            const result = LocalDateUtils.daysAgo(1);
            const expected = LocalDateUtils.yesterday();
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("tomorrow", () => {
        it("should return a Date object set to tomorrow at UTC midnight", () => {
            const result = LocalDateUtils.tomorrow();
            const now = new Date();
            now.setUTCDate(now.getUTCDate() + 1);
            const expected = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("daysAhead", () => {
        it("should return a Date object set to X days in the future at UTC midnight", () => {
            const days = 3;
            const result = LocalDateUtils.daysAhead(days);

            const now = new Date();
            now.setUTCDate(now.getUTCDate() + days);
            const expected = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

            expect(result.getTime()).toBe(expected.getTime());
        });

        it("should return today if days = 0", () => {
            const result = LocalDateUtils.daysAhead(0);
            const expected = LocalDateUtils.today();
            expect(result.getTime()).toBe(expected.getTime());
        });
    });

    describe("subtractDays", () => {
        it("should subtract the given number of days from the provided date", () => {
            const baseDate = new Date(Date.UTC(2025, 1, 15)); // 2025-02-15T00:00:00Z
            const daysToSubtract = 10;
            const result = LocalDateUtils.subtractDays(baseDate, daysToSubtract);

            const expected = new Date(Date.UTC(2025, 1, 5)); // 2025-02-05T00:00:00Z
            expect(result.getTime()).toBe(expected.getTime());
        });

        it("should return the same date if days to subtract is 0", () => {
            const baseDate = new Date(Date.UTC(2025, 1, 15));
            const result = LocalDateUtils.subtractDays(baseDate, 0);
            expect(result.getTime()).toBe(baseDate.getTime());
        });
    });

    describe("getLocalDate", () => {
        it("should return a new Date set to the UTC date portion of the provided date", () => {
            const dateWithTime = new Date(Date.UTC(2025, 1, 15, 13, 45, 0));
            const localDate = LocalDateUtils.getLocalDate(dateWithTime);

            const expected = new Date(Date.UTC(2025, 1, 15));
            expect(localDate.getTime()).toBe(expected.getTime());
        });

        it("should not include time information", () => {
            const dateWithTime = new Date(Date.UTC(2025, 11, 31, 23, 59, 59));
            const localDate = LocalDateUtils.getLocalDate(dateWithTime);

            expect(localDate.getUTCHours()).toBe(0);
            expect(localDate.getUTCMinutes()).toBe(0);
            expect(localDate.getUTCSeconds()).toBe(0);
        });
    });

    describe("getLocalISOString", () => {
        it("should return an ISO string representation of the UTC date at midnight", () => {
            const dateWithTime = new Date(Date.UTC(2025, 1, 15, 13, 45, 0));
            const localDate = LocalDateUtils.getLocalDate(dateWithTime);
            const isoString = LocalDateUtils.getLocalISOString(dateWithTime);
            expect(isoString).toBe(localDate.toISOString());
        });
    });

    describe("fromString", () => {
        it("should parse a date string into a UTC Date at midnight", () => {
            const dateStr = "2025-02-15T13:45:00Z";
            const result = LocalDateUtils.fromString(dateStr);

            const expected = new Date(Date.UTC(2025, 1, 15));
            expect(result.getTime()).toBe(expected.getTime());
        });

        it("should ignore the time portion of the input string", () => {
            const dateStr = "2025-02-15T23:59:59";
            const result = LocalDateUtils.fromString(dateStr);

            const expected = new Date(Date.UTC(2025, 1, 15));
            expect(result.getTime()).toBe(expected.getTime());
        });

        it("should handle ISO date strings without time component", () => {
            const dateStr = "2025-02-15";
            const result = LocalDateUtils.fromString(dateStr);

            expect(result.getUTCHours()).toBe(0);
            expect(result.getUTCMinutes()).toBe(0);
            expect(result.getUTCSeconds()).toBe(0);

            expect(result.getUTCFullYear()).toBe(2025);
            expect(result.getUTCMonth()).toBe(1);
            expect(result.getUTCDate()).toBe(15);
        });
    });
});
