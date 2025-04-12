import { MMR } from '../entity/mmr.js'

export class ValorantService {

    _token;

    constructor(token) {
        this._token = token;
    }

    _buildMMR(puuid, fetchMMRResponseBody) {
        return new MMR(
            puuid,
            fetchMMRResponseBody.data.account.name + '#' + fetchMMRResponseBody.data.account.tag,
            fetchMMRResponseBody.data.history[0].match_id,
            fetchMMRResponseBody.data.history[0].map.name,
            fetchMMRResponseBody.data.history[0].last_change,
            fetchMMRResponseBody.data.history[0].tier.name,
            fetchMMRResponseBody.data.history[0].rr,
        );
    }

    fetchMMR(puuid, lastMatchId, callback) {
        return fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr-history/br/pc/${puuid}?size=1`, {headers: {'Authorization': this._token}})
            .then(res => res.json())
            .then(responseBody => {
                const mmr = this._buildMMR(puuid, responseBody);
                callback(mmr, lastMatchId);
            });
    }

}

