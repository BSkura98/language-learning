import { Validator, Schema } from 'jsonschema';

import { TranslateRequest } from './request';
import { BadRequestError } from '../../errors/BadRequestError';

export const validate = (body: TranslateRequest) => {
  const validator = new Validator();

  const validation = validator.validate(body, validationSchema);

  if (!validation.valid) {
    throw new BadRequestError('Invalid request body');
  }
};

const validationSchema: Schema = {
  type: 'object',
  properties: {
    sourceLanguageCode: {
      type: 'string'
    },
    targetLanguageCode: {
      type: 'string'
    },
    text: {
      type: 'string'
    }
  }
};
