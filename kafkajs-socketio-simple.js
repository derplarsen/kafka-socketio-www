const fs = require('fs')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketio_port = '33334';
const Promise = require('bluebird');
const { Kafka, logLevel } = require('kafkajs');
const { exec } = require('child_process');

//Express webserver
http.listen(socketio_port, function(){
  console.log('listening on *:'+socketio_port);
});

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: ['localhost:9092'],
  clientId: 'example-consumer'
  /////// Uncomment below if you have security turned on,
  //////  ..and of course you'll hit the non-plaintext listener port above
  //,
  //ssl: {
  //   rejectUnauthorized: false
  //},
  //sasl: {
  //  mechanism: 'plain',
  //  username: 'test',
  //  password: 'test123',
  //},
})

// Instantiate the socket.io session.. once that's instantiated, run the kafka consumer
io.on('connection', function(socket){

  // Define the Kafka Consumer properties
  const consumer_1 = kafka.consumer({ groupId: 'grouptest' , fromOffset: 0})

  //Define the async Consumer session to execute
  const run_consumer_1 = async () => {
    const test_topic = 'test_topic';
    await consumer_1.connect();
    await consumer_1.subscribe({ topic: test_topic });
    await consumer_1.run({
        eachMessage: async ({ topic, partition, message }) => {

            console.log({
              partition,
              offset: message.offset,
              value: message.value.toString(),
            });

            var msg={
              partition,
              offset: message.offset,
              value: message.value.toString(),
            };

            // Emit the Kafka message to any web page is listening to the 'test_topic' channel
            socket.broadcast.emit(test_topic, msg.value);
        },
    });
  }

  //Run the consumer and catch any errrors
  run_consumer_1().catch(e => console.error(`[example/consumer_1] ${e.message}`, e))

});
