export class Leaderboard {

    _mmrs;

    constructor(mmrs) {
        this._mmrs = mmrs;
    }

    updateMessage() {

        let message = ':trophy:\n';

        this._mmrs
            .sort((a, b) => b.elo - a.elo)
            .forEach((mmr, index) => {
                message = message + `${index + 1}. ${mmr.leaderboardMessage()}\n`;
            });

        return message;

    }

}
