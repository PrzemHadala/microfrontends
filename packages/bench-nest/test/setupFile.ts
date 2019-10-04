import { getConnection } from 'typeorm'

afterEach(async () => {
  const connection = await getConnection()
  await connection.synchronize(true)
  await connection.close()
})