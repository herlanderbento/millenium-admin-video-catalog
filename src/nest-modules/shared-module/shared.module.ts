import { Global, Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3Storage } from '../../core/shared/infra/storage/aws-s3.storage';
import { S3Client } from '@aws-sdk/client-s3';
import { DomainEventMediator } from '../../core/shared/domain/events/domain-event-mediator';
import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../core/shared/application/application.service';
import { IUnitOfWork } from '../../core/shared/domain/repository/unit-of-work.interface';

@Global()
@Module({
  providers: [
    {
      provide: 'IStorage',
      useFactory: (configService: ConfigService) => {
        const accountID = configService.get('CLOUDFLARE_ACCOUNT_ID');
        const accessKeyId = configService.get('CLOUDFLARE_AWS_ACCESS_KEY_ID');
        const secretAccessKey = configService.get(
          'CLOUDFLARE_AWS_SECRET_ACCESS_KEY',
        );
        const bucket = configService.get('CLOUDFLARE_AWS_BUCKET_NAME');
        const storage = new S3Client({
          endpoint: `https://${accountID}.r2.cloudflarestorage.com`,
          region: 'auto',
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        });
        return new AwsS3Storage(storage, bucket);
      },
      inject: [ConfigService],
    },
    {
      provide: DomainEventMediator,
      useValue: new DomainEventMediator(new EventEmitter2()),
    },
    {
      provide: ApplicationService,
      useFactory: (
        uow: IUnitOfWork,
        domainEventMediator: DomainEventMediator,
      ) => {
        return new ApplicationService(uow, domainEventMediator);
      },
      inject: ['UnitOfWork', DomainEventMediator],
      scope: Scope.REQUEST,
    },
  ],
  exports: ['IStorage', ApplicationService],
})
export class SharedModule {}
