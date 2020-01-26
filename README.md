# whisper-example
Docker compose environment and example for whisper.

## Environment Init

A bootnode key was generated:

```bash
docker run --rm -v ${PWD}/bootnode/:/bootnode/:rw --entrypoint bootnode ethereum/client-go:alltools-v1.9.10 "-genkey=/bootnode/bootnode.key"
```

New accounts where generated

```bash
docker-compose run --rm geth account new
```

resulting in 

```
Your new key was generated

Public address of the key:   0x367E3Ac27dAf7595f5A62F0de74c37f15D459D45
Path of the secret key file: /keystore/UTC--2020-01-26T12-13-41.627717698Z--367e3ac27daf7595f5a62f0de74c37f15d459d45
```

A second account was generated


```bash
docker-compose run --rm geth account new
```

resulting

```
Your new key was generated

Public address of the key:   0x771552299F38E66403371BE507189FB491cE8D2a
Path of the secret key file: /keystore/UTC--2020-01-26T12-15-05.597330011Z--771552299f38e66403371be507189fb491ce8d2a
```

Warning: Never use these accounts outside this example.

A genesis file was created using puppeth.

```bash
docker-compose up --rm puppeth
```

The genesis file was exported.

The nodes have to be initialized using the genesis file:

```bash
docker-compose run --no-deps --rm node1 init /genesis.json
docker-compose run --no-deps --rm node2 init /genesis.json
```

## generate new keys

```bash
docker-compose run --rm geth account new
```

## run

To send a message from app2 to app1 start the nodes.

```bash
docker-compose up -d node1
docker-compose up -d node2
```

Wait some seconds the nodes can find each other using the bootnode.

Start the first app.

```bash
docker-compose up app1
```

In another terminal start the second sending app.

```bash
docker-compose up app2
```

App 2 will send Hello World! which will be printed on app 1.
