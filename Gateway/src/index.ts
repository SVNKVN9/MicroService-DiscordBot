import { WebSocketManager, WebSocketShardEvents, WorkerShardingStrategy } from "@discordjs/ws";
import { REST } from "@discordjs/rest";
import { IConfig } from "./types";
import EventFilter from "./events/EventFilter";

const config = require('../../config.json') as IConfig

const rest = new REST().setToken(config.TOKEN)

const Manager = new WebSocketManager({
    token: config.TOKEN,
    intents: 3276799,
    rest,
})

Manager.setStrategy(new WorkerShardingStrategy(Manager, { shardsPerWorker: 'all' }))

Manager.on(WebSocketShardEvents.Dispatch, ({ data }) => {
    const { t, d } = data

    EventFilter(t, d)
})

Manager.connect()
