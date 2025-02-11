import {Module} from '@nestjs/common';
import {CardModule} from './cards/card.module';
import {QuizzModule} from "./quizz/quizz.module";
import {UtilsModule} from "./utils/utils.module";

@Module({
    imports: [
        CardModule,
        QuizzModule,
        UtilsModule
    ],
})
export class AppModule {
}