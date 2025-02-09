import {Category} from "./category.enum";

export class Card {

    public lastResponseDate: Date | null = null;

    constructor(
        public id: string,
        public category: Category,
        public question: string,
        public answer: string,
        public tag: string
    ) {
    }

    /**
     * Level up the category of the card
     *
     * The category of the card can be leveled up to a maximum {@link Category.SEVENTH} level.
     *
     * @returns {Card} The card with the updated category
     * @throws {Error} If the category is already at the maximum level
     * @example
     * card.levelUpCategory();
     * @throws {Error} If the category is already at the maximum level
     * @see Category
     */
    levelUpCategory(): Card {
        const categories = Object.values(Category);
        const currentCategoryIndex = categories.indexOf(this.category);

        if (currentCategoryIndex == categories.length - 1) {
            throw new Error('Category is already at the maximum level');
        }


        this.category = categories[currentCategoryIndex + 1];

        return this;
    }

    /**
     * Reset the category of the card to the {@link Category.FIRST} level
     *
     * @example
     * card.resetCategory();
     */
    resetCategory(): void {
        this.category = Category.FIRST;
    }

    /**
     * Answer the question of the card
     *
     * If the answer is correct, the category of the card is leveled up.
     * If the answer is incorrect, the category of the card is reset to the {@link Category.FIRST} level.
     *
     * @param isCorrect {boolean} Whether the answer is correct or not
     * @throws {Error} If the category is already at the maximum level
     * @see Category
     */
    answerQuestion(isCorrect: boolean): void {
        if (isCorrect) {
            this.levelUpCategory();
        } else {
            this.resetCategory();
        }
    }
}