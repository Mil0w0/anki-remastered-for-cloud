import {Module} from '@nestjs/common';
import {CardController} from './adapters/controller/card.controller';
import {CardService} from './services/card.service';
import {CardRepositoryImpl} from './adapters/db/card.repository.impl';

@Module({
    imports: [],
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
