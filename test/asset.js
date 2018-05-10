

const https = require('http');


const options = {
    // hostname: '222.73.56.202',
    // port: 7001    ,

     hostname: '127.0.0.1',
    port: 59606    ,

    path: '/v1/user/asset',
    method: 'GET',
    headers: {
        ver: "V1.1.1",
        token: "D543F92DD65541FA923F23E56630D746",
        uid: 1,
        source: "ios"

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
req.end();
