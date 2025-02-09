import {Category} from "./category.enum";

export class Card {

    public lastResponseDate: Date | null = null;

    constructor(
        public id: string,
        public category: Category,
        public question: string,
        public answer: string,
        public tag: string
    ) {}

    /**
     * Level up the category of the card
     *
     * The category of the card can be leveled up to a maximum {@link Category.SEVENTH} level.
     *
     * @returns {Card} The card with the updated category
     * @throws {Error} If the category is already at the maximum level
     * @example
     * card.levelUpCategory();
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
}  