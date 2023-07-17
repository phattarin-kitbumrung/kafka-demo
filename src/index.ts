import express from 'express'
import { Admin } from './kafka/admin'
import { Producer } from './kafka/producer'
import { Consumer } from './kafka/consumer'

const app = express()
const port = 3000

app.listen(port, async () => {       
  console.log( `server started at http://localhost:${port}`)
  
  const admin = new Admin()
  await admin.connect()
  await admin.createTopics([{
      topic: 'mint',
      numPartitions: 3
    }]
  )
  await admin.disconnect()

  const producer = new Producer()
  await producer.connect()
  await producer.publishToQueue('mint', [{key: 'msg1', value: 'Hello KafkaJS user1!'}])
  await producer.publishToQueue('mint', [{key: 'msg2', value: 'Hello KafkaJS user2!'}])
  await producer.publishToQueue('mint', [{key: 'msg3', value: JSON.stringify({name: 'KafkaJS user3!'})}])
  await producer.disconnect()

  const consumer1 = new Consumer('test-group')
  const consumer2 = new Consumer('test-group')
  const consumer3 = new Consumer('test-group')
  await consumer1.connect()
  await consumer2.connect()
  await consumer3.connect()
  await consumer1.consumeFromQueue('mint')
  await consumer2.consumeFromQueue('mint')
  await consumer3.consumeFromQueue('mint')
  await consumer1.disconnect()
  await consumer2.disconnect()
  await consumer3.disconnect()
})
