import { createServer } from 'node:http';

const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.end('Server UP');
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
