import { ShardingManager } from 'discord.js'
import { IConfig } from "./types";

const config = require('../../config.json') as IConfig

const Manager = new ShardingManager('./dist/bot.js', {
    token: config.TOKEN,
    totalShards: 'auto',
    respawn: true
})

const DateFormat = () => `[${new Date().toString().split(" ", 5).join(" ")}]`

Manager.on('shardCreate', (shard) => {
    console.log(`${DateFormat()} Main System Launched shard (${shard.id})`)

    shard.on("death", (process) => {
        console.log(`${DateFormat()} Shard (${shard.id}) closed unexpectedly!`);
    });

    shard.on("disconnect", () => {
        console.log(`${DateFormat()} Shard (${shard.id}) disconnected. Dumping socket close event...`);
    });

    shard.on("reconnecting", () => {
        console.log(`${DateFormat()} Shard (${shard.id}) is reconnecting...`);
    });

    shard.on('error', (error) => {
        console.log(`${DateFormat()} Shard (${shard.id}) is ${error}`);
    });
})

Manager.spawn()

process.on('uncaughtException', (err) => console.log(err))
