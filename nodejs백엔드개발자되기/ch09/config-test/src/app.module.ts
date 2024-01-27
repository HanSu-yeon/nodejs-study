import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env: ' + process.env.NODE_ENV);
console.log('currnet working directory: ' + process.cwd()); //현재 디렉토리 출력

@Module({
  //ConfigModule 설정(옵션:전역)
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config],
      cache: true,
      expandVariables: true,
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
