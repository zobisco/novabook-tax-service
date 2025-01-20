import { TypeOrmModuleOptions } from '@nestjs/typeorm';;

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'novabook.sqlite',
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: ['./dist/database/migrations/*.js'],
};
