import {Module} from '@nestjs/common';
import {CardController} from './adapters/controller/card.controller';
import {CardService} from './services/card.service';
import {CardRepositoryImpl} from './adapters/db/card.repository.impl';
import {QuizzValidationService} from "../quizz/services/quizz.validation.service";
import {QuizzModule} from "../quizz/quizz.module";

@Module({
    imports: [QuizzModule],
    controllers: [CardController],
    providers: [
        CardService,
        CardRepositoryImpl,
        {
            provide: 'CardRepository',
            useClass: CardRepositoryImpl
        }
    ],
    exports: [CardService],
})
export class CardModule {
}
