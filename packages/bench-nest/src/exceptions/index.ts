import { PostgressException } from './db'
import { POSTGRES_ERRORS } from '../constants/postgres'

export function resolveException(err) {
  if (POSTGRES_ERRORS.includes(Number(err.code))) {
    throw new PostgressException(err)
  }
  throw new Error(err)
}
