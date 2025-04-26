export class MatchPlayer {

    _puuid;
    _name;
    _agentId;
    _agentName;
    _score;
    _kda;
    _headshots;
    _bodyshots;
    _legshots;
    _damageDealt;
    _damageReceived;


    constructor(puuid, name, agentId, agentName, score, kills, deaths, assists, headshots, bodyshots, legshots, damageDealt, damageReceived) {
        this._puuid = puuid;
        this._name = name;
        this._agentId = agentId;
        this._agentName = agentName;
        this._score = score;
        this._kda = `${kills} / ${deaths} / ${assists}`;
        this._headshots = `${headshots} (${(headshots / (headshots + bodyshots + legshots) * 100).toFixed(2)}%)`;
        this._bodyshots = `${bodyshots} (${(bodyshots / (headshots + bodyshots + legshots) * 100).toFixed(2)}%)`;
        this._legshots = `${legshots} (${(legshots / (headshots + bodyshots + legshots) * 100).toFixed(2)}%)`;
        this._damageDealt = damageDealt;
        this._damageReceived = damageReceived;
    }

    get puuid() {
        return this._puuid;
    }

    get name() {
        return this._name;
    }

    get agentId() {
        return this._agentId;
    }

    get agentName() {
        return this._agentName;
    }

    get score() {
        return this._score;
    }

    get kda() {
        return this._kda;
    }

    get headshots() {
        return this._headshots;
    }

    get bodyshots() {
        return this._bodyshots;
    }

    get legshots() {
        return this._legshots;
    }

    get damageDealt() {
        return this._damageDealt;
    }

    get damageReceived() {
        return this._damageReceived;
    }

}
