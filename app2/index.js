const Shh = require('web3-shh');
const shh = new Shh('ws://node2:8546');

const privKey = '0xd8e5d206eb5b92c9d1fd69f65fb4d5cf31fa79dde4a19b89dde27cf6e7d71dc6';
let privKeyId;
const app1PubKey = '0x047e95dbd53f834b679786e618915ba6e139a305dcf8d05aea79f64a3adb9db526a78efbaf3633286816b40674dc2b42d511f9b5a4f6866d9c7cd32d43d508aa79';

shh.getInfo()
    .then(console.log);

shh.net.getId()
    .then((id) => { console.log('Network ID:', id) });

shh.net.getPeerCount()
    .then((count) => { console.log('Peers:', count) });

shh.addPrivateKey(privKey)
    .then((id) => {
        privKeyId = id;
        console.log('added priv key id:', id)
        shh.getPublicKey(id)
            .then(console.log);

        shh.post({
            pubKey: app1PubKey,
            ttl: 10,
            topic: '0xffdd1337',
            payload: '0x' + Buffer.from('Hello World!', 'utf8').toString('hex'),
            powTime: 3,
            powTarget: 0.5
        }).then(h => console.log(`Message with hash ${h} was successfuly sent`))
            .catch(err => console.log("Error: ", err));
    });
