import { Client, GatewayIntentBits, ActivityType } from "discord.js";

export class DiscordService {

    _client;
    _discordServerId;
    _discordChannelId;
    _token;
    _discordServer;
    _discordChannel;

    constructor(token, discordServerId, discordChannelId) {
        this._client = new Client({intents: [GatewayIntentBits.Guilds]});
        this._token = token;
        this._discordServerId = discordServerId;
        this._discordChannelId = discordChannelId;

        this._client.once('ready', () => {
            this._client.user.setStatus("online");
            this._client.user.setActivity("Você", {type: ActivityType.Watching});
            this._discordServer = this._client.guilds.cache.get(this._discordServerId);
            this._discordChannel = this._discordServer.channels.cache.get(this._discordChannelId);
        });
    }

    async connect() {
        await this._client.login(this._token);
        return this;
    }

    sendMessage(text) {
        this._discordChannel.send(text);
    }

}
