const amqp = require('amqplib/callback_api');
const Joi = require('joi');
const logger = require('../config/logger');
const calvinQuoter = require('../services/calvinQuoter');

const queueName = 'quoteFavIncrement';

const schema = Joi.object().keys({
  id: Joi.string().alphanum().min(24).max(24).required()
});

const validate = (data) => {
  const { error, _value } = Joi.validate(data, schema);
  return error;
};


const enqueue = (data) => {
  amqp.connect('amqp://localhost', (err, conn) => {
    if (err) return logger.error(err);
    conn.createChannel((err1, ch) => {
      if (err1) return logger.error(err1);
      try {
        const msg = JSON.stringify(data);

        ch.assertQueue(queueName, { durable: true });
        ch.sendToQueue(queueName, Buffer.from(msg), { persistent: true });
      } catch (err2) {
        logger.error(err2);
      }
    });
    setTimeout(() => { conn.close(); }, 500);
  });
};

module.exports = {
  getQueueName: () => {
    return queueName;
  },
  enqueue: (data) => {
    if (!validate(data)) {
      enqueue(data);
    } else {
      throw Error('invalid job data');
    }
  },
  work: (data) => {
    calvinQuoter.incrementFavCount(data.id);
  },
};
