

const https = require('https');
var userInfo = {};

module.exports = app => {
    app.addSingleton('tg', createTg);
}


function createTg(config, app) {
    request = function (url, fn) {
        https.get(url, (res) => {
            var data = "";
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', () => {
                data = JSON.parse(data);
                return fn(null, data);
            });

        }).on('error', (e) => {
            console.error(e);
            return fn(true);
        });
    }
    postRequest = function (chat_id, text) {
        var postData = JSON.stringify({
            chat_id: chat_id,
            text: text
        })
        const options = {
            hostname: 'api.telegram.org',
            path: '/bot539963230:AAHGSBnLHs_v9oEMZUR9IGtdtDm4N3a13_8/sendMessage',
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(postData),
                'Content-Type': 'application/json; charset=UTF-8'

            }
        };

        const req = https.request(options, res => {
            res.on('data', d => {
                process.stdout.write(d);
            });
        });


        req.on('error', e => {
            console.error(e);
        });
        req.write(postData);

        req.end();

    }
    // 创建实例
    const client = {
        resetUserInfo: function (fn) {
            console.log("egg-tg.resetUserInfo begin");
            if (config.enable == false) {
                console.log("tg close");
                return fn();
            }
            request('https://api.telegram.org/bot468478553:AAECQWsTNj5wkzTHNcS1IIw48d_GqoFwox8/getUpdates',
                function (err, ourRes) {
                    if (err) {
                        console.log("egg-tg resetUserInfo", err);
                        return fn();
                    }
                    if (!ourRes.ok) {
                        return fn();
                    }
                    for (var i = 0; i < ourRes.result.length; i++) {
                        let chat = ourRes.result[i].message.chat;
                        userInfo[chat.last_name] = chat.id;
                    }
                    console.log("egg-tg.resetUserInfo end");
                    return fn();
                });
        },
        sendMsg: function (last_name, text, fn) {
            console.log("egg-tg.sendMsg begin");
            if (config.enable == false) {
                console.log("tg close");
                return fn();
            }
            let chatid = userInfo[last_name];
            postRequest(chatid, text, fn);
        }
    };

    return client;
}

// var a = createTg();
// a.resetUserInfo(() => {
//     console.log("end");
//     a.sendMsg("cc", "hi cc", () => {
//         console.log("end");
//     });
// });

