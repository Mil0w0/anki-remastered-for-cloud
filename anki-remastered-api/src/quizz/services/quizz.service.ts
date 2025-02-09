import {CardService} from "../../cards/services/card.service";

export class QuizzService {

    constructor(private readonly cardService: CardService) {
    }

    getEligibleCards() {
        return this.cardService.getAllCards()
            .then(cards =>
                cards.filter(
                    card => card.lastResponseDate === null ||
                        card.lastResponseDate < new Date(new Date().toLocaleDateString())
                )
            );
    }
}