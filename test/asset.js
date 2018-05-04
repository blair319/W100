

const https = require('http');


const options = {
    hostname: '222.73.56.202',
    port: 7001    ,

    //  hostname: '127.0.0.1',
    // port: 55791    ,

    path: '/v1/user/asset',
    method: 'GET',
    headers: {
        ver: "V1.1.1",
        token: "0A36E1A5934C46D8A3C1DE58FFB1EB77",
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
