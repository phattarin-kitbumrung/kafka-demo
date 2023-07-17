import { kafka } from './config'

export interface Topic {
    topic: string
    numPartitions: number
}

export class Admin {
    private admin

    constructor() {
        this.admin = kafka.admin()
    }

    public connect = async() => {
        try {
            await this.admin.connect() 
        } catch (error) {
            console.log(error)
        }
    }

    public disconnect = async() => {
        try {
            await this.admin.disconnect()
        } catch (error) {
            console.log(error)
        }
    }

    public createTopics = async (topics: Topic[]) => {
        // create new topics
        try {
            await this.admin.createTopics({
                topics: topics
            })
            // console.log(await this.admin.fetchTopicOffsets('topic_name'))
        } catch (error) {
            console.log(error)
        }
    }
}
