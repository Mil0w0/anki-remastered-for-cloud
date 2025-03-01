import {Module} from '@nestjs/common';
import {CardModule} from './cards/card.module';
import {QuizzModule} from "./quizz/quizz.module";
import {UtilsModule} from "./utils/utils.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigService} from "./config/database.config";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // makes ConfigService available globally
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], // ensure ConfigModule is imported here
            useClass: TypeOrmConfigService,
        }),
        QuizzModule,
        CardModule,
        UtilsModule
    ],
})
export class AppModule {
}