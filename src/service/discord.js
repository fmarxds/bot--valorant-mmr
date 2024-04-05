import {Client, GatewayIntentBits, ActivityType} from "discord.js";

export class DiscordService {

    #client;
    #discordServerId;
    #discordChannelId;
    #token
    #discordServer;
    #discordChannel;

    constructor(token, discordServerId, discordChannelId) {
        this.#client = new Client({intents: [GatewayIntentBits.Guilds]});
        this.#token = token;
        this.#discordServerId = discordServerId;
        this.#discordChannelId = discordChannelId;
    }

    async connect() {
        await this.#client.login(this.#token)
            .then(() => {
                this.#client.user.setStatus("online");
                this.#client.user.setActivity("Você", {type: ActivityType.Watching});
                this.#discordServer = this.#client.guilds.cache.get(this.#discordServerId);
                this.#discordChannel = this.#discordServer.channels.cache.get(this.#discordChannelId);
            });
        return this;
    }

    sendMessage(text) {
        this.#discordChannel.send(text);
    }

}
