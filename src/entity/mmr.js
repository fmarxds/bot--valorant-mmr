export class MMR {

    #puuid;
    #playerName;
    #lastMatchId;
    #lastMapName;
    #wonLastMatch;
    #pdl;

    constructor(puuid, playerName, lastMatchId, lastMapName, pdl) {
        this.#puuid = puuid;
        this.#playerName = playerName;
        this.#lastMatchId = lastMatchId;
        this.#lastMapName = lastMapName;
        this.#wonLastMatch = pdl >= 0;
        this.#pdl = Math.abs(pdl);
    }


    get puuid() {
        return this.#puuid;
    }

    get playerName() {
        return this.#playerName;
    }

    get lastMatchId() {
        return this.#lastMatchId;
    }

    get lastMapName() {
        return this.#lastMapName;
    }

    get wonLastMatch() {
        return this.#wonLastMatch;
    }

    get pdl() {
        return this.#pdl;
    }

    function

    updateMessage() {
        return `${this.#playerName} acabou de ${this.#wonLastMatch ? 'ganhar' : 'perder'} ${this.#pdl} PDLs no mapa ${this.#lastMapName}.`;
    }

}
