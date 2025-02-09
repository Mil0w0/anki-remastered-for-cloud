import {CardService} from "../../cards/services/card.service";
import {Category} from "../../cards/domain/category.enum";
import {LocalDateUtils} from "../../utils/LocalDateUtils";

export class QuizzService {

    constructor(private readonly cardService: CardService) {
    }

    async getEligibleCards() {
        const cards = await this.cardService.getAllCards();
        return cards.filter(
            card => card.lastResponseDate === null
                || (card.lastResponseDate < LocalDateUtils.yesterday() && (card.category === Category.FIRST || card.category === Category.SECOND))
                || (card.lastResponseDate < LocalDateUtils.daysAgo(4) && card.category === Category.THIRD)
        );
    }
}