

// console.log(Number("11111.12345678912345") + Number("11111.12345678912345"));
// return;

const https = require('http');

var t = function () {
    const options = {
        hostname: '222.73.56.202',
        port: 7001,
        // hostname: '127.0.0.1',
        // port: 58259,
        path: '/v1/quot/ranking',
        method: 'GET',
        headers: {
            ver: "V1.1.1",
            token: "93C7712DAF1C4B61892BED0969EA522A1",
            uid: 1,
            source: "ios",
            'Content-Type': 'application/json; charset=UTF-8'

        }
    };

    const req = https.request(options, res => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', d => {
            process.stdout.write(d);
        });
    });


    req.on('error', e => {
        console.error(e);
    });
    // req.write(postData);

    req.end();
}

setInterval(function () {
    t()}, 2000
);
