const Shh = require('web3-shh');
const shh = new Shh('ws://node1:8546');

const privKey = '0x9bbb72420698981efda7f56fadaf3c4b66d70afa7962ca5f06068f29205d8d67'
let privKeyId;

shh.getInfo()
    .then(console.log);

shh.net.getId()
    .then((id) => { console.log('Network ID:', id) });

shh.net.getPeerCount()
    .then((count) => { console.log('Peers:', count) });

shh.newKeyPair()
    .then((id) => {
        console.log('New Keypair id:', id)
        shh.getPrivateKey(id)
            .then(console.log);
        shh.getPublicKey(id)
            .then(console.log);
    });

shh.addPrivateKey(privKey)
    .then((id) => {
        privKeyId = id;
        console.log('added priv key id:', id)
        shh.getPublicKey(id)
            .then(console.log);

        shh.subscribe('messages', {
            privateKeyID: privKeyId,
            ttl: 20,
            topics: ['0xffdd1337'],
            allowP2P: true,
            minPow: 0.1
        }
        ).on('data', (message) => {
            console.log(message)
            console.log(Buffer.from(message.payload.substring(2), 'hex').toString('utf8'))
        });
    });
