import { Notification } from './notification';

export type FieldsErrors =
  | {
      [field: string]: string[];
    }
  | string;

export interface IValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean;
}

// export type FieldsErrors = {
//   [field: string]: string[];
// };

// export interface IValidatorFields<PropsValidated> {
//   errors: FieldsErrors;
//   validatedData: PropsValidated;
//   validate(data: any): boolean;
// }
