export class LocalDateUtils {
    /**
     * Returns today's date at 00:00:00 UTC (start of the day)
     */
    static today(): Date {
        return this.toUTCStartOfDay(new Date());
    }

    /**
     * Returns yesterday's date at 00:00:00 UTC
     */
    static yesterday(): Date {
        return this.daysAgo(1);
    }

    /**
     * Returns a date X days in the past at 00:00:00 UTC
     * @param days Number of days ago
     */
    static daysAgo(days: number): Date {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() - days);
        return this.toUTCStartOfDay(date);
    }

    /**
     * Returns tomorrow's date at 00:00:00 UTC
     */
    static tomorrow(): Date {
        return this.daysAhead(1);
    }

    /**
     * Returns a date X days in the future at 00:00:00
     *
     * @param days Number of days ahead
     * @returns {Date} The date X days in the future
     *
     * @example LocalDateUtils.daysAhead(1); // returns tomorrow's date
     * @example LocalDateUtils.daysAhead(7); // returns the date 7 days from now
     */
    static daysAhead(days: number): Date {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() + days);
        return this.toUTCStartOfDay(date);
    }

    /**
     * Subtracts days from a given date at 00:00:00 UTC
     */
    static subtractDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setUTCDate(newDate.getUTCDate() - days);
        return this.toUTCStartOfDay(newDate);
    }

    /**
     * Returns a local date at 00:00:00 UTC
     */
    static getLocalDate(date: Date): Date {
        return this.toUTCStartOfDay(date);
    }

    /**
     * Converts a date to an ISO string at 00:00:00 UTC
     */
    static getLocalISOString(date: Date): string {
        return this.getLocalDate(date).toISOString();
    }

    /**
     * Parses a date string and sets time to 00:00:00 UTC
     */
    static fromString(dateStr: string): Date {
        return this.toUTCStartOfDay(new Date(dateStr));
    }

    /**
     * Ensures the given date is set to 00:00:00 UTC
     */
    private static toUTCStartOfDay(date: Date): Date {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }
}
