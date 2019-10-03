import { HttpException, HttpStatus } from "@nestjs/common"

import { UNIQUE_VIOLATION } from '../constants/postgres'

interface IErrorsMap {
  [fieldName: number]: (x: string) => string
}
interface IErrorCodesMap {
  [fieldName: number]: number
}

const errorsMap: IErrorsMap = {
  [UNIQUE_VIOLATION]: detail => detail
}
const errorCodesMap: IErrorCodesMap = {
  [UNIQUE_VIOLATION]: HttpStatus.BAD_REQUEST
}

const resolvePostgressError = (code : number, detail : string) => errorsMap[code] && errorsMap[code](detail)
const resolvePostgressCode = (errCode: number) => errorCodesMap[errCode]

export class PostgressException extends HttpException {
  constructor(err) {
    const errMsg = resolvePostgressError(err.code, err.detail)
    const errCode = resolvePostgressCode(err.code)
    super(errMsg, errCode);
  }
}