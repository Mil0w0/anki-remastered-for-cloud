import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

async function getSecret(secretName: string): Promise<string> {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
        name: `projects/1098142107823/secrets/${secretName}/versions/latest`,
    });
    const payload = version.payload?.data?.toString();
    if (!payload) {
        throw new Error(`Secret ${secretName} has no payload.`);
    }
    return payload;
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const isProduction = process.env.NODE_ENV === 'production';

        console.log('isProduction', isProduction);

        let dbUsername: string;
        let dbPassword: string;
        let dbDatabase: string;
        let dbInstanceConnectionName: string;

        if (isProduction) {
            // Fetch the secrets from Secret Manager in production
            dbUsername = await getSecret('DB_USERNAME');
            dbPassword = await getSecret('DB_PASSWORD');
            dbDatabase = await getSecret('DB_DATABASE');
            dbInstanceConnectionName = await getSecret('DB_INSTANCE_CONNECTION_NAME');
        } else {
            // For local development, you can use env variables or fallback defaults
            dbUsername = process.env.DB_USERNAME || 'local_username';
            dbPassword = process.env.DB_PASSWORD || 'local_password';
            dbDatabase = process.env.DB_DATABASE || 'local_database';
            dbInstanceConnectionName = process.env.DB_INSTANCE_CONNECTION_NAME || 'local_instance';
        }

        // For logging (remove or adjust in production)
        console.log('host', isProduction ? `/cloudsql/${dbInstanceConnectionName}` : process.env.DB_HOST);
        console.log('username', dbUsername);
        console.log('database', dbDatabase);

        return {
            type: 'postgres',
            host: isProduction
                ? `/cloudsql/${dbInstanceConnectionName}`
                : process.env.DB_HOST,
            port: isProduction ? undefined : Number(process.env.DB_PORT),
            username: dbUsername,
            password: dbPassword,
            database: dbDatabase,
            autoLoadEntities: true,
            synchronize: true,
            extra: isProduction
                ? { socketPath: `/cloudsql/${dbInstanceConnectionName}` }
                : {},
        };
    }
}