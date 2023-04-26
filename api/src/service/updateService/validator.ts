import { Validator, Schema } from 'jsonschema';

import { UpdateRepetitionRequest } from './request';
import { BadRequestError } from '../../errors/BadRequestError';

export const validate = (body: UpdateRepetitionRequest) => {
  const validator = new Validator();

  const validation = validator.validate(
    { sourceLanguageText: body.sourceLanguageText, targetLanguageText: body.targetLanguageText },
    validationSchema
  );

  if (!validation.valid) {
    throw new BadRequestError('Invalid request body');
  }
};

const validationSchema: Schema = {
  type: 'object',
  properties: {
    sourceLanguageText: {
      type: 'string'
    },
    targetLanguageText: {
      type: 'string'
    },
    nextRepetitionDate: {
      type: 'string',
      format: 'date-time'
    }
  }
};
