const http = require('http');
const handler = require('serve-handler');

const server = http.createServer((request, response) => {
    // Дополнительная обработка запросов может быть добавлена здесь

    // Обслуживание файлов из корневой директории
    return handler(request, response, {
        rewrites: [
            { source: '/pong/', destination: '/index.html' }
        ]
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
