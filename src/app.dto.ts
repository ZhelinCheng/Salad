/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:24:08
 * @LastEditTime: 2019-11-26 17:39:13
 * @LastEditors: Zhelin Cheng
 * @Description: DTO
 */
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
import { ROUTER_PAGES } from './const'

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
  @IsIn(ROUTER_PAGES.concat(['random']))
  readonly page: string

  @IsString()
  @Validate(IsSize)
  readonly size: string

  @IsString()
  @IsHexColor()
  @IsOptional()
  readonly color: string
}
