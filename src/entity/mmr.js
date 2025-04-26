import { bold } from 'discord.js';
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

    constructor(puuid, playerName, lastMatchId, lastMapName, pdl, tier, rankInTier, elo) {
        this._puuid = puuid;
        this._playerName = playerName;
        this._lastMatchId = lastMatchId;
        this._lastMapName = lastMapName;
        this._pdl = Math.abs(pdl);
        this._tier = tier;
        this._rankInTier = rankInTier;
        this._elo = elo;

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
        let message;

        switch (this._lastMatchStatus) {
            case MatchStatus.VICTORY:
                message = `:loudspeaker:\n${bold(this._playerName)} acabou de ${bold('GANHAR')} ${this._pdl} PDLs no mapa ${this._lastMapName}   :sunglasses:\nElo atual: ${this._tier} | ${this._rankInTier} pontos`;
                break;

            case MatchStatus.DEFEAT:
                message = `:loudspeaker:\n${bold(this._playerName)} acabou de ${bold('PERDER')} ${this._pdl} PDLs no mapa ${this._lastMapName}   :pleading_face:\nElo atual: ${this._tier} | ${this._rankInTier} pontos`;
                break;

            case MatchStatus.DRAW:
                message = `:loudspeaker:\n${bold(this._playerName)} acabou de ${bold('PERDER VÁRIOS MINUTOS DE VIDA')} empatando no mapa ${this._lastMapName} e ganhando ${this._pdl} PDLs    :weary:\nElo atual: ${this._tier} | ${this._rankInTier} pontos`;
                break;
        }

        return message;
    }

    statusMessage() {
        return `${bold(this._playerName)} | ${this._tier} (${this._rankInTier} PDLs)`;
    }

}
