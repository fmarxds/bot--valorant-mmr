export class Match {

    _matchId;
    _matchDurationMinutes;
    _scoreboard;
    _player;


    constructor(matchId, matchDurationMinutes, matchWinnerPoints, matchLoserPoints, player) {
        this._matchId = matchId;
        this._matchDurationMinutes = matchDurationMinutes;
        this._scoreboard = matchWinnerPoints + ' / ' + matchLoserPoints;
        this._player = player;
    }

    get matchId() {
        return this._matchId;
    }

    get matchDurationMinutes() {
        return this._matchDurationMinutes;
    }

    get scoreboard() {
        return this._scoreboard;
    }

    get player() {
        return this._player;
    }
}
