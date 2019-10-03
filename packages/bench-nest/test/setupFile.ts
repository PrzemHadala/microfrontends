import { getConnection } from 'typeorm'

afterEach(async () => {
  const connection = await getConnection()
  connection.synchronize(true)
  connection.close()
})