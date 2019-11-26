/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:24:08
 * @LastEditTime: 2019-11-26 13:25:39
 * @LastEditors: Zhelin Cheng
 * @Description: DTO
 */
import * as path from 'path'
import * as fs from 'fs-extra'
import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
  IsOptional,
  IsString,
  IsHexColor,
  IsIn,
  Validate
} from 'class-validator'

const pagesPath = path.resolve(__dirname, '../pages')
let pages = fs.readdirSync(pagesPath)

pages = pages.filter(dir => {
  return fs.statSync(path.join(pagesPath, dir)).isDirectory()
})

@ValidatorConstraint({ name: 'size', async: false })
class IsSize implements ValidatorConstraintInterface {
  validate(size: string, args: ValidationArguments) {
    return /^[1-9]\d{1,3}x[1-9]\d{1,3}$/.test(size)
  }

  defaultMessage(args: ValidationArguments) {
    return '$value 不正确！'
  }
}

export class BaseParamsDto {
  @IsString()
  @IsIn(pages.concat(['random']))
  readonly page: string

  @IsString()
  @Validate(IsSize)
  readonly size: string

  @IsString()
  @IsHexColor()
  @IsOptional()
  readonly color: string
}
