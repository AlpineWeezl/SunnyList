'use strict'

class miscellaneus {

    static getNewId() {
        let id = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key > id) {
                id = key;
            } else {
                id = id;
            }
        }
        return parseInt(id) + 1;
    }
}

