'use strict';

const expect = require('expect');
const Joi = require('./joi-cron-expression');

const validCronStrings = [
  '* * * * * *',
  '0 0 12 * *',
  '0 0 12 1/5 *',
  '5 0 * 8 *',
  '*/5 * * * *',
  '0 22 * * 1-5',
  '23 0-20/2 * * *',
  '5 4 * * sun',
  '0 0,12 1 */2 *',
  '@weekly',
  '5 4 * * MON-THU',
];

const invalidCronStrings = [
  '0 5 31 2 *',
  'invalid character',
  '@every-other-week',
];

it('should validate strings', (done) => {
  const result = Joi.validate('test', Joi.string());
  expect(result.error).toEqual(null, 'should not have an error');
  expect(result.value).toBe('test');
  done();
});

it('should validate cron strings', (done) => {
  validCronStrings.forEach(str => {
    let result = Joi.validate(str, Joi.string().cron());
    expect(result.error).toEqual(null, 'should not have an error');
    expect(result.value).toBe(str);
  });
  done();
});

it('should not validate invalid cron strings', (done) => {
  invalidCronStrings.forEach(str => {
    let result = Joi.validate(str, Joi.string().cron());
    expect(typeof result.error).toBe('object', 'should not be validated without an error');
    expect(result.value).toBe(str);
  });
  done();
});
