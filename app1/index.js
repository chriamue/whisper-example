const Shh = require('web3-shh');
const shh = new Shh('ws://node1:8546');

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
