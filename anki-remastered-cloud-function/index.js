const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({"isValid": true });
});
