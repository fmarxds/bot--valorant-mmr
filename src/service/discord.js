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
    _valorantService;

    constructor(clientId, token, discordServerId, discordChannelId, valorantService) {
        this._clientId = clientId;
        this._client = new Client({intents: [GatewayIntentBits.Guilds]});
        this._token = token;
        this._discordServerId = discordServerId;
        this._discordChannelId = discordChannelId;
        this._valorantService = valorantService;

        this._slashCommands = [
            {name: 'ping', description: 'Replies with pong'},
            {name: 'leaderboard', description: 'Shows valorant leaderboard'},
        ];

        this._slashCommandsFunctions = {
            'ping': this._slashCommandPing,
            'leaderboard': this._slashCommandLeaderboard,
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
            slashCommandFunction(this, interaction);
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

    async _slashCommandPing(self, interaction) {
        await interaction.reply('Pong!');
    }

    async _slashCommandLeaderboard(self, interaction) {
        let leaderboard = await self._valorantService.fetchLeaderbord();
        await interaction.reply(leaderboard);
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
