import {forwardRef, Module} from '@nestjs/common';
import {CardController} from './adapters/controller/card.controller';
import {CardService} from './services/card.service';
import {CardRepositoryImpl} from './adapters/db/card.repository.impl';
import {QuizzValidationService} from "../quizz/services/quizz.validation.service";
import {QuizzModule} from "../quizz/quizz.module";

@Module({
    imports: [QuizzModule, forwardRef(() => QuizzModule)],
    controllers: [CardController],
    providers: [
        CardRepositoryImpl,
        {
            provide: 'CardRepository',
            useClass: CardRepositoryImpl
        },
        {
            provide: 'CardService',
            useClass: CardService
        }
    ],
    exports: ['CardService'],
})
export class CardModule {
}
