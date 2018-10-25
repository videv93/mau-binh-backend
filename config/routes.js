'use strict';

const Bcrypt = require('bcrypt');
const Users = require('../resourceAccess/Users');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, world 2!';
        }
    },
    {
        method: 'GET',
        path: '/{name}',
        handler: (request, h) => {
            return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
        }
    },
    {
        method: 'POST',
        path: '/api/v1/login',
        handler: (request, h) => {
            return 'Hello, authentication!';
        }
    },
    {
        method: 'GET',
        path: '/api/v1/logout',
        options: {
            auth: 'jwt'
        },
        handler: (request, h) => {
            return 'Hello, authentication!';
        }
    },
    {
        method: 'POST',
        path: '/api/v1/register',
        handler: async (req, h) => {
            let data = req.payload;
            const { username, password } = data;
            const saltRounds = 10;
            return await Bcrypt.genSalt(saltRounds, function(err, salt) {
                if (err) {
                    console.log(err);
                    return 'error!!';
                }
                Bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        console.log(err);
                        return 'error!!';
                    }
                    data.password = hash;
                    data.updated_at = new Date();
                    Users.create(data).then(result => {
                        return 'user created';
                    }).catch(err => {
                        console.log(err);
                        return 'error!!';
                    })
                })
            })
        }
    }
]