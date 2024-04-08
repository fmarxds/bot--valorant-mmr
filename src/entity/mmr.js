import { bold } from 'discord.js';

export class MMR {

    _puuid;
    _playerName;
    _lastMatchId;
    _lastMapName;
    _wonLastMatch;
    _pdl;
    _tier;
    _rankInTier;

    constructor(puuid, playerName, lastMatchId, lastMapName, pdl, tier, rankInTier) {
        this._puuid = puuid;
        this._playerName = playerName;
        this._lastMatchId = lastMatchId;
        this._lastMapName = lastMapName;
        this._wonLastMatch = pdl >= 0;
        this._pdl = Math.abs(pdl);
        this._tier = tier;
        this._rankInTier = rankInTier;
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

    get wonLastMatch() {
        return this._wonLastMatch;
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
        return `:loudspeaker:\n        ${bold(this._playerName)} acabou de ${this._wonLastMatch ? bold('GANHAR') : bold('PERDER')} ${this._pdl} PDLs no mapa ${this._lastMapName}   ${this._wonLastMatch ? ':sunglasses:' : ':pleading_face:'}\n        Elo atual: ${this._tier} / ${this._rankInTier} pontos`;
    }

}
