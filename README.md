# joi-cron-expression

## Installation
```bash
npm install joi-cron-expression
```

## Usage
```javascript
const Joi = require('joi-cron-expression')(require('joi'));

Joi.validate('*/5 * * * *', Joi.string().cron());
```
