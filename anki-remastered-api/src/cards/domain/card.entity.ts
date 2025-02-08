export class Card {
    constructor(public id: string, public category: string, public question: string, public answer: string, public tag: string) {
    }

    levelUpCategory(): Card {
        if (this.category === "FIRST") {
            this.category = "SECOND";
        }

        return this;
    }
}  