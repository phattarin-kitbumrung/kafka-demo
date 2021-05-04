import express from 'express'
import { publishMessage } from './kafka/producer'
import { consumeMessage } from './kafka/consumer'

const app = express()
const port = 3000

publishMessage()
consumeMessage()

app.listen(port, () => {       
    console.log( `server started at http://localhost:${port}`)
})