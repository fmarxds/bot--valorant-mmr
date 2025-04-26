import { Client, GatewayIntentBits, ActivityType, REST, Routes, Events } from "discord.js";

export class DiscordService {

    _client;
    _discordServerId;
    _discordChannelId;
    _clientId;
    _token;
    _discordServer;
    _discordChannel;
    _slashCommands;
    _slashCommandsFunctions;

    constructor(clientId, token, discordServerId, discordChannelId) {
        this._clientId = clientId;
        this._client = new Client({intents: [GatewayIntentBits.Guilds]});
        this._token = token;
        this._discordServerId = discordServerId;
        this._discordChannelId = discordChannelId;

        this._slashCommands = [
            {
                name: 'ping',
                description: 'Replies with pong',
            },
        ];

        this._slashCommandsFunctions = {
            'ping': this._slashCommandPing,
        }

        this._client.once('ready', () => {
            this._client.user.setStatus("online");
            this._client.user.setActivity("Você", {type: ActivityType.Watching});
            this._discordServer = this._client.guilds.cache.get(this._discordServerId);
            this._discordChannel = this._discordServer.channels.cache.get(this._discordChannelId);
        });

        this._client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) {
                return;
            }

            let slashCommandFunction = this._slashCommandsFunctions[interaction.commandName];

            if (slashCommandFunction === null) {
                console.error(`Slash function ${interaction.commandName} not registered!`);
            }

            await slashCommandFunction(interaction);
        });
    }

    async _registerSlashCommands() {
        const rest = new REST({version: '10'}).setToken(this._token);
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(this._clientId), {
                body: this._slashCommands,
            });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }

    async _slashCommandPing(interaction) {
        await interaction.reply('Pong!');
    }

    async connect() {
        await this._client.login(this._token);
        await this._registerSlashCommands();
        return this;
    }

    sendMessage(text) {
        this._discordChannel.send(text);
    }

}
