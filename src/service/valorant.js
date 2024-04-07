import { MMR } from '../entity/mmr.js'

export class ValorantService {

    constructor() {
    }

    #buildMMR(puuid, fetchMMRResponseBody) {
        return new MMR(
            puuid,
            fetchMMRResponseBody.name + '#' + fetchMMRResponseBody.tag,
            fetchMMRResponseBody.data[0].match_id,
            fetchMMRResponseBody.data[0].map.name,
            fetchMMRResponseBody.data[0].last_mmr_change,
        );
    }

    fetchMMR(puuid, lastMatchId, callback) {
        return fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/mmr-history/br/${puuid}?size=1`)
            .then(res => res.json())
            .then(responseBody => {
                const mmr = this.#buildMMR(puuid, responseBody);
                callback(mmr, lastMatchId);
            });
    }

}

