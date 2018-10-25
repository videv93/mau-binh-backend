'use strict';

const DB = require('../config/database').DB;

module.exports = {
    create:  function(data) {
        return DB('users').insert(data);
    }
}