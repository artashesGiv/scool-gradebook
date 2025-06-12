import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator'

export const Match = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value === relatedValue
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          return `${propertyName} должно совпадать с ${relatedPropertyName}`
        },
      },
    })
  }
}
