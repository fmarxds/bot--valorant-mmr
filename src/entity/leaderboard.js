export class Leaderboard {

    _mmrs;

    constructor(mmrs) {
        this._mmrs = mmrs;
    }

    updateMessage() {

        let message = '';

        this._mmrs
            .sort((a, b) => b.elo - a.elo)
            .forEach((mmr, index) => {

                if (index === 0) {
                    message = message + ':trophy:\n';
                }

                message = message + `${index + 1}. ${mmr.statusMessage()}\n`;

            });

        return message;

    }

}
