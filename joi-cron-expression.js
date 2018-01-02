'use strict';

const Joi = require('joi');
const cronParser = require('cron-parser');

module.exports = Joi.extend({
  name: 'string',
  base: Joi.string(),
  language: {
    cron: 'needs to be a cron expression'
  },
  rules: [
    {
      name: 'cron',
      validate(params, value, state, options) {
        try {
          cronParser.parseExpression(value);
        } catch (err) {
          return this.createError('string.cron', {v: value}, state, options);
        }
        return value;
      }
    }
  ]
});

