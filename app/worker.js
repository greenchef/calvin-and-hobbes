require('./config');
const amqp = require('amqplib/callback_api');
const logger = require('./config/logger');
const QuoteFavJob = require('./jobs/quoteFav');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    try {
      const queueName = QuoteFavJob.getQueueName();

      ch.assertQueue(queueName, { durable: true });

      logger.info(` [*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

      ch.consume(queueName, (msg) => {
        const data = JSON.parse(msg.content);
        QuoteFavJob.work(data);
        // ack should be done in a promise resolve, here for example only
        ch.ack(msg);
      }, { noAck: false });
    } catch (err2) {
      logger.error(err2);
    }
  });
});
