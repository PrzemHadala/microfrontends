import { User } from '../modules/users/models/user.entity'

export const getDbConfig = (overrides?: object): object => {
  console.log(process.env.NODE_ENV)
  return ({
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [
    User
  ],
  ...overrides
})
}