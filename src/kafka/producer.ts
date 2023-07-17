import { kafka } from './config'

export interface Message {
    key: string
    value: string
}

export class Producer {
    private producer

    constructor() {
        this.producer = kafka.producer()
    }

    public connect = async() => {
        try {
            await this.producer.connect() 
        } catch (error) {
            console.log(error)
        }
    }

    public disconnect = async() => {
        try {
            await this.producer.disconnect()
        } catch (error) {
            console.log(error)
        }
    }

    public publishToQueue = async (topic: string, msg: Message[]) => {
        // start send message
        try {
            await this.producer.send({
                topic: topic,
                messages: msg
            })
        } catch (error) {
            console.log(error)
        }
    }
}
