// Create web server

var http = require('http');
var url = require('url');

var comments = [
    {name: 'John', message: 'Hello World!', date: new Date()},
    {name: 'Susan', message: 'Hi, John!', date: new Date()}
];

var server = http.createServer(function(req, res) {
    if (req.method === 'GET') {
        var urlObj = url.parse(req.url, true);
        if (urlObj.pathname === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(`
                <form method="POST" action="/add">
                    <input type="text" name="name" placeholder="Name"><br>
                    <textarea name="message" placeholder="Message"></textarea><br>
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    ${comments.map(function(comment) {
                        return `
                            <li>
                                <p>${comment.name} - ${comment.message}</p>
                                <p>${comment.date}</p>
                            </li>
                        `;
                    }).join('')}
                </ul>
            `);
        } else if (urlObj.pathname === '/add') {
            var data = '';
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                var comment = querystring.parse(data);
                comment.date = new Date();
                comments.push(comment);
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('Page not found');
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Page not found');
    }
});

server.listen(8080);
console.log('Server is running on http://localhost:8080');
