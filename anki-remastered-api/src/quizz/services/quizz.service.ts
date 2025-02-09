import {CardService} from "../../cards/services/card.service";
import {Category, getCategoryDelayInDays} from "../../cards/domain/category.enum";
import {LocalDateUtils} from "../../utils/LocalDateUtils";

export class QuizzService {

    constructor(private readonly cardService: CardService) {
    }

    async getEligibleCards() {
        const cards = await this.cardService.getAllCards();
        return cards.filter(card => {
                // if the card has never been answered, it is eligible
                if (!card.lastResponseDate) {
                    return true;
                }
                return card.lastResponseDate <= LocalDateUtils.daysAgo(getCategoryDelayInDays(card.category));

            }
        );
    }
}