import { bold, italic } from 'discord.js';
import { MatchStatus } from './match-status-enum.js'

export class MMR {

    _puuid;
    _playerName;
    _lastMatchId;
    _lastMapName;
    _lastMatchStatus;
    _pdl;
    _tier;
    _rankInTier;
    _elo;
    _match;

    constructor(puuid, playerName, lastMatchId, lastMapName, pdl, tier, rankInTier, elo, match) {
        this._puuid = puuid;
        this._playerName = playerName;
        this._lastMatchId = lastMatchId;
        this._lastMapName = lastMapName;
        this._pdl = Math.abs(pdl);
        this._tier = tier;
        this._rankInTier = rankInTier;
        this._elo = elo;
        this._match = match;

        if (pdl === 0) {
            this._lastMatchStatus = MatchStatus.DRAW;
        } else if (pdl > 0) {
            this._lastMatchStatus = MatchStatus.VICTORY;
        } else {
            this._lastMatchStatus = MatchStatus.DEFEAT;
        }

    }

    get puuid() {
        return this._puuid;
    }

    get playerName() {
        return this._playerName;
    }

    get lastMatchId() {
        return this._lastMatchId;
    }

    get tier() {
        return this._tier;
    }

    get elo() {
        return this._elo;
    }

    updateMessage() {
        let message = `:loudspeaker:\n${bold(this._playerName)} acabou de `;

        switch (this._lastMatchStatus) {
            case MatchStatus.VICTORY:
                message += `${bold('GANHAR')} ${this._pdl} PDLs `;
                break;

            case MatchStatus.DEFEAT:
                message += `${bold('PERDER')} ${this._pdl} PDLs `;
                break;

            case MatchStatus.DRAW:
                message += `${bold('PERDER VÁRIOS MINUTOS DE VIDA')} empatando `;
                break;
        }

        message += `no mapa ${this._lastMapName}!`;

        message += `\n\n:mag: ${bold(italic('ELO ATUAL'))}\n`;
        message += `${this._tier} | ${this._rankInTier} Pontos`;

        message += `\n\n:pencil: ${bold(italic('ESTATÍSTICAS'))}\n`;
        message += '```\n';
        message += `${'Placar: '.padEnd(16) + this._match.scoreboard}\n`;
        message += `${'Duração: '.padEnd(16) + this._match.matchDurationMinutes}\n`;
        message += `${'Agente: '.padEnd(16) + this._match.player.agentName}\n`;
        message += `${'KDA: '.padEnd(16) + this._match.player.kda}\n`;
        message += `${'Headshots: '.padEnd(16) + this._match.player.headshots}\n`;
        message += `${'Bodyshots: '.padEnd(16) + this._match.player.bodyshots}\n`;
        message += `${'Legshots: '.padEnd(16) + this._match.player.legshots}\n`;
        message += `${'Dano Causado: '.padEnd(16) + this._match.player.damageDealt}\n`;
        message += `${'Dano Recebido: '.padEnd(16) + this._match.player.damageReceived}\n`;
        message += '```';

        return message;
    }

    leaderboardMessage() {
        return `${bold(this._playerName)} | ${this._tier} (${this._rankInTier} PDLs)`;
    }

}
