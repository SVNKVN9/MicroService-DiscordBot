import { Client, GatewayIntentBits } from 'discord.js'
import { GatewayDispatchEvents } from 'discord-api-types/v10'
import { IConfig } from './types'

const { Service_URL, TOKEN } = require('../../config.json') as IConfig

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('raw', (data) => {

})

client.login(TOKEN)

process.on('uncaughtException', (err) => console.log(err))