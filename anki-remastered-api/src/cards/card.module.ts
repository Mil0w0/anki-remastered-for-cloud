import {forwardRef, Module} from '@nestjs/common';
import {CardController} from './adapters/controller/card.controller';
import {CardService} from './services/card.service';
import {CardRepositoryImpl} from './adapters/db/card.repository.impl';
import {QuizzModule} from "../quizz/quizz.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Card} from "./domain/card.entity";
import {CARD_REPOSITORY} from "./domain/ports/card.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Card]),
        QuizzModule,
        forwardRef(() => QuizzModule)
    ],
    controllers: [CardController],
    providers: [
        CardRepositoryImpl,
        {
            provide: CARD_REPOSITORY,
            useClass: CardRepositoryImpl
        },
        {
            provide: 'CardService',
            useClass: CardService
        },
        CardRepositoryImpl
    ],
    exports: ['CardService', CARD_REPOSITORY],
})
export class CardModule {
}
