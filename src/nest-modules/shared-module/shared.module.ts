import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3Storage } from '../../core/shared/infra/storage/aws-s3.storage';
import { S3Client } from '@aws-sdk/client-s3';

@Global()
@Module({
  providers: [
    // {
    //   provide: 'IStorage',
    //   useFactory: (configService: ConfigService) => {
    //     const credentials = configService.get('GOOGLE_CLOUD_CREDENTIALS');
    //     const bucket = configService.get('GOOGLE_CLOUD_STORAGE_BUCKET_NAME');
    //     const storage = new GoogleCloudStorageSdk({
    //       credentials,
    //     });
    //     return new GoogleCloudStorage(storage, bucket);
    //   },
    //   inject: [ConfigService],
    // },
    {
      provide: 'IStorage',
      useFactory: (configService: ConfigService) => {
        const accountID = configService.get('CLOUDFLARE_ACCOUNT_ID');
        const accessKeyId = configService.get('CLOUDFLARE_ACCESS_KEY_ID');
        const secretAccessKey = configService.get(
          'CLOUDFLARE_SECRET_ACCESS_KEY',
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
  ],
  exports: ['IStorage'],
})
export class SharedModule {}
