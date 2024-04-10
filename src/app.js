import 'dotenv/config'
import './server.js'
import { Database } from './database/database.js';
import { DiscordService } from './service/discord.js';
import { ValorantService } from './service/valorant.js';

const db = new Database(process.env['PUUIDS']);
const valorantService = new ValorantService();
const discordService = await new DiscordService(process.env['DISCORD_BOT_TOKEN'], process.env['DISCORD_SERVER_ID'], process.env['DISCORD_CHANNEL_ID']).connect();

function verifyMMRUpdate(mmr, lastMatchId) {

    if (lastMatchId == null) {
        db.update(mmr.puuid, mmr.lastMatchId);
        return;
    }

    if (mmr.lastMatchId === lastMatchId) {
        return;
    }

    discordService.sendMessage(mmr.updateMessage());
    db.update(mmr.puuid, mmr.lastMatchId);

}

async function execute() {
    for (let [puuid, lastMatchId] of Object.entries(db.getAll())) {
        valorantService.fetchMMR(puuid, lastMatchId, verifyMMRUpdate)
            .catch(err => console.log(err));
    }
}

setInterval(execute, Number(process.env['EXECUTION_INTERVAL']));

console.log('Application started!');
