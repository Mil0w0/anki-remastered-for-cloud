import {CardService} from "../../cards/services/card.service";
import {getCategoryDelayInDays} from "../../cards/domain/category.enum";
import {LocalDateUtils} from "../../utils/local.date.utils";
import {QuizzRepository} from "../domain/ports/quizz.repository";
import {Card} from "../../cards/domain/card.entity";

export class QuizzService {

    constructor(private readonly cardService: CardService, private readonly quizzRepository: QuizzRepository) {
    }

    async getEligibleCardsAtDate(date: Date): Promise<Card[]> {
        const cards: Card[] = await this.cardService.getAllCards();
        const eligibleCards = cards.filter(card => {
                // if the card is done, it is never eligible
                if (card.isDone()) {
                    return false;
                }

                // if the card has never been answered, it is eligible
                if (!card.lastResponseDate) {
                    return true;
                }
                return card.lastResponseDate <= LocalDateUtils.subtractDays(date, getCategoryDelayInDays(card.category));
            }
        );

        const alreadyGeneratedQuizz = this.quizzRepository.getQuizzForUser("1");
        if (!alreadyGeneratedQuizz) {
            this.quizzRepository.saveQuizzForUser("1", cards);
            return eligibleCards;
        }
        // we return the intersection of the eligible cards and the cards that were already generated
        // (we eliminate already answered cards and cards that have been created since the last quizz generation)
        return alreadyGeneratedQuizz.filter(card => eligibleCards.includes(card));
    }

    // default behavior is with the date of today
    async getEligibleCards(): Promise<Card[]> {
        return this.getEligibleCardsAtDate(LocalDateUtils.today());
    }
}