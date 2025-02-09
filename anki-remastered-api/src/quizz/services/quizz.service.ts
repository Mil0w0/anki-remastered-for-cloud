import {CardService} from "../../cards/services/card.service";
import {Category} from "../../cards/domain/category.enum";
import {LocalDateUtils} from "../../utils/LocalDateUtils";

export class QuizzService {

    constructor(private readonly cardService: CardService) {
    }

    async getEligibleCards() {
        const cards = await this.cardService.getAllCards();
        return cards.filter(card => {
                // If never answered, eligible
                if (!card.lastResponseDate) {
                    return true;
                }
                switch (card.category) {
                    case Category.FIRST:
                        return card.lastResponseDate <= LocalDateUtils.yesterday();
                    case Category.SECOND:
                        return card.lastResponseDate <= LocalDateUtils.daysAgo(2);
                    case Category.THIRD:
                        return card.lastResponseDate <= LocalDateUtils.daysAgo(4);
                    default:
                        return false;
                }
            }
        );
    }
}