/**
 * Utility class for working with local dates
 */
export class LocalDateUtils {
    /**
     * Returns today's date at 00:00:00 (start of the day)
     */
    static today(): Date {
        return new Date(new Date().toLocaleDateString());
    }

    /**
     * Returns yesterday's date at 00:00:00
     */
    static yesterday(): Date {
        return this.daysAgo(1);
    }

    /**
     * Returns a date X days in the past at 00:00:00
     * @param days Number of days ago
     */
    static daysAgo(days: number): Date {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return new Date(date.toLocaleDateString());
    }

    /**
     * Returns tomorrow's date at 00:00:00
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
        date.setDate(date.getDate() + days);
        return new Date(date.toLocaleDateString());
    }

    static subtractDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - days);
        return newDate;
    }

    static getLocalDate(date: Date): Date {
        return new Date(date.toLocaleDateString());
    }

    static getLocalISOString(date: Date): string {
        return this.getLocalDate(date).toISOString();
    }
}
