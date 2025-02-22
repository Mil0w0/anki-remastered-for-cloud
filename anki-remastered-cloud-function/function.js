const functions = require('@google-cloud/functions-framework');

functions.http('compareAnswers', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if ('OPTIONS' == req.method) {
        res.status(200).send();
    }
    if(!req.body['userAnswer'] || !req.body['cardAnswer'] ){
        res.status(400).send("Bad request");
    }
    const userAnswer = req.body['userAnswer'].toLowerCase();
    const cardAnswer = req.body['cardAnswer'].toLowerCase();

    res.status(200).send({"isValid": userAnswer === cardAnswer });
});
