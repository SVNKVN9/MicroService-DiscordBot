import { Client, GatewayIntentBits } from 'discord.js'
import { GatewayDispatchEvents } from 'discord-api-types/v10'
import { IConfig } from './types'
import axios from 'axios'

const { Service_URL, TOKEN } = require('../../config.json') as IConfig

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

const MessageService = async (path: string, data: any) => await axios.post(`${Service_URL.Message}/${path}`, data)

client.on('raw', (data) => {
    switch (data.t) {
        case GatewayDispatchEvents.Ready:
            console.log(`(${client.shard?.ids}) is ready`)

            break;
        case GatewayDispatchEvents.MessageCreate:
            MessageService('create', data.d)

            break;
    }
})

client.login(TOKEN)

process.on('uncaughtException', (err) => console.log(err))