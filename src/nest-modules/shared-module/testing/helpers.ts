import { getConnectionToken } from '@nestjs/sequelize';
import { applyGlobalConfig } from '../../../global-config';
import { Sequelize } from 'sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { UnitOfWorkSequelize } from '../../../core/shared/infra/db/sequelize/unit-of-work-sequelize';

// export function startApp() {
//   let _app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();
//     const sequelize = moduleFixture.get<Sequelize>(getConnectionToken());

//     await sequelize.sync({ force: true });

//     _app = moduleFixture.createNestApplication();
//     applyGlobalConfig(_app);
//     await _app.init();
//   });

//   afterEach(async () => {
//     await _app?.close();
//   });

//   return {
//     get app() {
//       return _app;
//     },
//   };
// }

// export function startApp() {
//   let _app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     })
//       .overrideProvider('UnitOfWork')
//       .useFactory({
//         factory: (sequelize: Sequelize) => {
//           return new UnitOfWorkSequelize(sequelize as any);
//         },
//         inject: [getConnectionToken()],
//       })
//       .compile();
//     const sequelize = moduleFixture.get<Sequelize>(getConnectionToken());

//     await sequelize.sync({ force: true });

//     _app = moduleFixture.createNestApplication();
//     applyGlobalConfig(_app);
//     await _app.init();
//   });

//   afterEach(async () => {
//     await _app?.close();
//   });

//   return {
//     get app() {
//       return _app;
//     },
//   };
// }

export function startApp() {
  let _app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('UnitOfWork')
      .useFactory({
        factory: (sequelize: Sequelize) => {
          return new UnitOfWorkSequelize(sequelize as any);
        },
        inject: [getConnectionToken()],
      })
      .compile();

    const sequelize = moduleFixture.get<Sequelize>(getConnectionToken());

    try {
      await sequelize.sync({ force: true });
    } catch (error) {
      console.error('Error during database synchronization:', error);
      throw error;
    }

    _app = moduleFixture.createNestApplication();
    applyGlobalConfig(_app);
    await _app.init();
  });

  afterEach(async () => {
    if (_app) {
      await _app?.close();
    }
  });

  return {
    get app() {
      return _app;
    },
  };
}
