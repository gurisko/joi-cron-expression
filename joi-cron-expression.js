'use strict';

const cronParser = require('cron-parser');

module.exports = (Joi) => {
  return Joi.extend({
    type: 'string',
    base: Joi.string(),
    messages: {
      'string.cron': '"{{#value}}" must be a cron expression',
    },
    rules: {
      cron: {
        validate(value, {error}) {
          try {
            cronParser.parseExpression(value);
          } catch (err) {
            return error('string.cron', {value});
          }
          return value;
        },
      },
    },
  });
};
