'use strict';

const Hapi = require('hapi');
const Routes = require('./config/routes');
const Bcrypt = require('bcrypt');
const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};
const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};
const validate = async (request, username, password) => {

    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
};
const validateJwt = async function(decoded, request) {
    if (!people[decoded.id]) {
        return { isValid: false };
    } else {
        return { isValid: true };
    }
}
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    // await server.register(require('hapi-auth-basic'));
    await server.register(require('hapi-auth-jwt2'));
    // server.auth.strategy('simple', 'basic', { validate });
    server.auth.strategy('jwt', 'jwt', {
        key: 'NeverShareYourSecret',
        validate: validateJwt,
        verifyOptions: { algorithms: [ 'HS256' ]}
    })
    server.route(Routes);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();