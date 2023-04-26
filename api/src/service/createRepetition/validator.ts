import { Validator, Schema } from 'jsonschema';

import { CreateRepetitionRequest } from './request';
import { BadRequestError } from '../../errors/BadRequestError';

export const validate = (body: CreateRepetitionRequest) => {
  const validator = new Validator();

  const validation = validator.validate(body, validationSchema);

  if (!validation.valid) {
    throw new BadRequestError('Invalid request body');
  }
};

const validationSchema: Schema = {
  type: 'object',
  properties: {
    sourceLanguage: {
      type: 'string'
    },
    targetLanguage: {
      type: 'string'
    },
    sourceLanguageText: {
      type: 'string'
    },
    targetLanguageText: {
      type: 'string'
    }
  }
};
