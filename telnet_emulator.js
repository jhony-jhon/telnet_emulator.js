const net = require('net');
const readline = require('readline');
const PORT = 8000;

const REQUEST = `\
GET / HTTP/1.1

`;

const client = new net.Socket();

client.connect(PORT, 'localhost', () => {
    console.log('Connected. Press enter to send the request.');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press Enter to send request...', (answer) => {
    console.log('Sending request:');
    console.log(REQUEST);
    client.write(REQUEST);
    rl.close();
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log('Connection closed');
    process.exit(0);
});

client.on('error', (err) => {
    console.log(`Error: ${err}`);
    process.exit(1);
});