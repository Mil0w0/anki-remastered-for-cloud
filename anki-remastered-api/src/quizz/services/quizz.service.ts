import {CardService} from "../../cards/services/card.service";
import {Category} from "../../cards/domain/category.enum";

export class QuizzService {

    constructor(private readonly cardService: CardService) {
    }

    getEligibleCards() {
        return this.cardService.getAllCards()
            .then(cards =>
                cards.filter(
                    card => card.lastResponseDate === null
                        || (card.lastResponseDate < new Date(new Date().toLocaleDateString()) && (card.category === Category.FIRST || card.category === Category.SECOND))
                        || (card.lastResponseDate <new Date(new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString()) && card.category === Category.THIRD)
                )
            );
    }
}