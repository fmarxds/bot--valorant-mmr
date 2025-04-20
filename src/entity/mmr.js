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

    constructor(puuid, playerName, lastMatchId, lastMapName, pdl, tier, rankInTier) {
        this._puuid = puuid;
        this._playerName = playerName;
        this._lastMatchId = lastMatchId;
        this._lastMapName = lastMapName;
        this._pdl = Math.abs(pdl);
        this._tier = tier;
        this._rankInTier = rankInTier;

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

    get lastMapName() {
        return this._lastMapName;
    }

    get lastMatchStatus() {
        return this._lastMatchStatus;
    }

    get pdl() {
        return this._pdl;
    }

    get tier() {
        return this._tier;
    }

    get rankInTier() {
        return this._rankInTier;
    }

    updateMessage() {
        let message;

        switch (this._lastMatchStatus) {
            case MatchStatus.VICTORY:
                message = `:loudspeaker:\n        ${bold(this._playerName)} acabou de ${bold('GANHAR')} ${this._pdl} PDLs no mapa ${this._lastMapName}   :sunglasses:\n        Elo atual: ${this._tier} :arrow_right: ${this._rankInTier} pontos`;
                break;

            case MatchStatus.DEFEAT:
                message = `:loudspeaker:\n        ${bold(this._playerName)} acabou de ${bold('PERDER')} ${this._pdl} PDLs no mapa ${this._lastMapName}   :pleading_face:\n        Elo atual: ${this._tier} :arrow_right: ${this._rankInTier} pontos`;
                break;

            case MatchStatus.DRAW:
                message = `:loudspeaker:\n        ${bold(this._playerName)} acabou de ${bold('PERDER VÁRIOS MINUTOS DE VIDA')} empatando no mapa ${this._lastMapName} e ganhando ${this._pdl} PDLs    :weary:\n        Elo atual: ${this._tier} :arrow_right: ${this._rankInTier} pontos`;
                break;
        }

        return message;
    }

}
