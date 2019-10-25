# kafka-socketio-www

Got kafka topic data you want to push out to a webpage? Do it with Socket.io! This is about the simplest possible way I could come up with to show how it works. Zero styling, zero computation, zero visualization, zero headbashing.

I hope this helps give a foundation to come up with some cool implementations.

Requirements: 
* Node.js installed
* Kafka running
* Topic "test_topic" created

Here's how to get it going:
1. `git clone https://github.com/derplarsen/kafka-socketio-www.git`

2. `cd kafka-socketio-www`

3. `npm install`

4. `npm start`

5. Open the showdata.html file in the web directory and start producing some data to "test_topic" (may need to be created first)

----------------------------
# Troubleshooting

Make sure you don't have a firewall running on port 33334

Look at the `kafkajs-socketio-simple.js` file and see if you need to change the host/port for your kafka broker.


# Note

You can also have Express serve up your html at the default "/" endpoint but wanted to keep this as simple as possible. Ping me if you want to learn more about that / you're not a node guy.
