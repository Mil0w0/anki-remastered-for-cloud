import { Category } from "./category.enum";

export class Card {
    constructor(public id: string, public category: Category, public question: string, public answer: string, public tag: string) {
    }

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