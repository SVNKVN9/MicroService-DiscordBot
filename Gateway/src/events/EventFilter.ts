import axios from 'axios'
import { GatewayDispatchEvents } from 'discord-api-types/v10'
import { IConfig } from '../types'

const { Service_URL } = require('../../../config.json') as IConfig

const MessageService = async (path: string, data: any) => await axios.post(`${Service_URL.Message}/${path}`, data)

export default (event: GatewayDispatchEvents, data: any) => {
    switch (event) {
        case GatewayDispatchEvents.Ready:
            console.log('Gateway is running')

            break;
        case GatewayDispatchEvents.MessageCreate:
            MessageService('create', data)

            break;
    }
}

process.on('uncaughtException', (err) => console.log(err))