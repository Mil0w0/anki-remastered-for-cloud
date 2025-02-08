export class Card {
    constructor(public id: string, public category: string, public question: string, public answer: string, public tag: string) {
    }

    levelUpCategory(): Card {
        if (this.category === "FIRST") {
            this.category = "SECOND";
        }else if (this.category === "SECOND") {
            this.category = "THIRD";
        } else if (this.category === "THIRD") {
            this.category = "FOURTH";
        }

        return this;
    }
}  