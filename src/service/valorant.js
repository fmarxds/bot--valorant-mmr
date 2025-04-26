import { MMR } from '../entity/mmr.js'
import { Leaderboard } from '../entity/leaderboard.js';
import { MatchPlayer } from '../entity/match-player.js';
import { Match } from '../entity/match.js';

export class ValorantService {

    _token;
    _db;

    constructor(token, db) {
        this._token = token;
        this._db = db;
    }

    _buildMatchPlayer(fetchMatchPlayerResponseBody) {
        return new MatchPlayer(
            fetchMatchPlayerResponseBody.puuid,
            fetchMatchPlayerResponseBody.name + '#' + fetchMatchPlayerResponseBody.tag,
            fetchMatchPlayerResponseBody.agent.id,
            fetchMatchPlayerResponseBody.agent.name,
            fetchMatchPlayerResponseBody.stats.score,
            fetchMatchPlayerResponseBody.stats.kills,
            fetchMatchPlayerResponseBody.stats.deaths,
            fetchMatchPlayerResponseBody.stats.assists,
            fetchMatchPlayerResponseBody.stats.headshots,
            fetchMatchPlayerResponseBody.stats.bodyshots,
            fetchMatchPlayerResponseBody.stats.legshots,
            fetchMatchPlayerResponseBody.stats.damage.dealt,
            fetchMatchPlayerResponseBody.stats.damage.received,
        );
    }

    _buildMatch(puuid, fetchMatchResponseBody) {
        return new Match(
            fetchMatchResponseBody.data.metadata.match_id,
            (fetchMatchResponseBody.data.metadata.game_length_in_ms / 60000).toFixed(0) + " Minutos",
            fetchMatchResponseBody.data.teams.filter(team => team.won)[0].rounds.won,
            fetchMatchResponseBody.data.teams.filter(team => team.won)[0].rounds.lost,
            this._buildMatchPlayer(fetchMatchResponseBody.data.players.filter(player => player.puuid === puuid)[0]),
        );
    }

    _buildMMR(puuid, fetchMMRResponseBody, match) {
        return new MMR(
            puuid,
            fetchMMRResponseBody.data.account.name + '#' + fetchMMRResponseBody.data.account.tag,
            fetchMMRResponseBody.data.history[0].match_id,
            fetchMMRResponseBody.data.history[0].map.name,
            fetchMMRResponseBody.data.history[0].last_change,
            fetchMMRResponseBody.data.history[0].tier.name,
            fetchMMRResponseBody.data.history[0].rr,
            fetchMMRResponseBody.data.history[0].elo,
            match,
        );
    }

    async _fetchMatch(puuid, matchId) {
        return fetch(`https://api.henrikdev.xyz/valorant/v4/match/br/${matchId}`, {headers: {'Authorization': this._token}})
            .then(res => res.json())
            .then(responseBody => {
                return this._buildMatch(puuid, responseBody);
            });
    }

    async _fetchMMR(puuid) {
        return fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr-history/br/pc/${puuid}?size=1`, {headers: {'Authorization': this._token}})
            .then(res => res.json())
            .then(async responseBody => {
                let match = await this._fetchMatch(puuid, responseBody.data.history[0].match_id);
                return this._buildMMR(puuid, responseBody, match);
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

