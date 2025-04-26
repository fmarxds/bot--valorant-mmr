import { MMR } from '../entity/mmr.js'
import { Leaderboard } from '../entity/leaderboard.js';

export class ValorantService {

    _token;
    _db;

    constructor(token, db) {
        this._token = token;
        this._db = db;
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
            fetchMMRResponseBody.data.history[0].elo,
        );
    }

    async _fetchMMR(puuid) {
        return fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr-history/br/pc/${puuid}?size=1`, {headers: {'Authorization': this._token}})
            .then(res => res.json())
            .then(responseBody => {
                return this._buildMMR(puuid, responseBody);
            });
    }

    async fetchMMR(puuid, lastMatchId, callback) {
        let mmr = await this._fetchMMR(puuid);
        return callback(mmr, lastMatchId);
    }

    async fetchLeaderbord() {
        let mmrPromises = [];

        for (let puuid of this._db.getAllKeys()) {
            mmrPromises.push(this._fetchMMR(puuid));
        }

       return Promise.all(mmrPromises)
            .then(mmrs => {
                let leaderboard = new Leaderboard(mmrs);
                return leaderboard.updateMessage();
            });

    }

}

