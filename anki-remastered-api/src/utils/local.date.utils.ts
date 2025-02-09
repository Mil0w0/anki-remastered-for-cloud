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
}
