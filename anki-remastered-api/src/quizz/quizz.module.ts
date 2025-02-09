import {Module} from "@nestjs/common";
import {QuizzController} from "./adapter/controller/quizz.controller";
import {QuizzService} from "./services/quizz.service";


@Module({
    imports: [],
    controllers: [QuizzController],
    providers: [QuizzService],
    exports: [QuizzService],
})
export class QuizzModule {
}