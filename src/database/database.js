export class Database {

    _db = new Map();

    constructor(puuids) {
        for (const puuid of puuids.split(',')) {
            this._db[puuid] = null;
        }
    }

    getAll() {
        return {...this._db};
    }

    update(key, value) {
        return this._db[key] = value;
    }

}
