export class Database {

    #db = new Map();

    constructor(puuids) {
        for (const puuid of puuids.split(',')) {
            this.#db[puuid] = null;
        }
    }

    getAll() {
        return {...this.#db};
    }

    update(key, value) {
        return this.#db[key] = value;
    }

}
