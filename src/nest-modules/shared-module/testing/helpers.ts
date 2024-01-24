import { getConnectionToken } from '@nestjs/sequelize';
import { applyGlobalConfig } from '../../../global-config';
import { Sequelize } from 'sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';

export function startApp() {
  let _app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const sequelize = moduleFixture.get<Sequelize>(getConnectionToken());

    await sequelize.sync({ force: true });

    _app = moduleFixture.createNestApplication();
    applyGlobalConfig(_app);
    await _app.init();
  });

  afterEach(async () => {
    await _app?.close();
  });

  return {
    get app() {
      return _app;
    },
  };
}
