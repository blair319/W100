

// console.log(Number("11111.12345678912345") + Number("11111.12345678912345"));
// return;

const https = require('http');

var postData=JSON.stringify({
    screen: "1000*200"
})
const options = {
    hostname: '222.73.56.202',
    // hostname: '127.0.0.1',
    // port: 51938,
    port: 7001,
    path: '/v1/aid/config/banner',
    method: 'GET',
    headers: {
        ver: "V1.1.1",
        token: "93C7712DAF1C4B61892BED0969EA522A1",
        uid: 2,
        source: "ios",
        'Content-Length': Buffer.byteLength(postData),
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
req.write(postData);

req.end();
