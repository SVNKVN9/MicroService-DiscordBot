import express, { Request, Response } from 'express'
import { GatewayMessageCreateDispatchData, Routes } from 'discord-api-types/v10'
import { REST } from '@discordjs/rest'

const { TOKEN } = require('../../config.json') 

const app = express()
const rest = new REST({ version: '10' }).setToken(TOKEN)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/create', async ({ body: message }: Request<{}, {}, GatewayMessageCreateDispatchData>, res: Response) => {
    if (message.content == 'ping') {
        await rest.post(Routes.channelMessages(message.channel_id), {
            body: {
                content: 'Pong!'
            }
        })
    }

    res.end()
})

app.listen(5001, () => console.log('Message Service is running'))

process.on('uncaughtException', (err) => console.log(err))