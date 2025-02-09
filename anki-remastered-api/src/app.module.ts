import {Module} from '@nestjs/common';
import {CardModule} from './cards/card.module';
import {QuizzModule} from "./quizz/quizz.module";

@Module({
    imports: [
        CardModule,
        QuizzModule,
    ],
})
export class AppModule {
}