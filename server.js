const http = require('http');
const fs = require('fs');

const hostname = '192.168.2.84'; // IP
const port = 3000; // порт

const server = http.createServer((req, res) => {
    let url = req.url;
    if (url == '/') {
        url = '/index'
    }

    // console.log(url);
    if (url != '/favicon.ico') {

        if (req.url.endsWith('.css')){
            let cssFile = req.url.slice(1);

            fs.readFile (cssFile, (err, data) => {
                if (err) throw err;

                res.setHeader('Content-Type', 'text/css');
                res.statusCode = 200;
                res.write(data);
                res.end()
            })
        }
        else if (req.url.endsWith('.js')){
            let jsFile = req.url.slice(1);

            fs.readFile (jsFile, (err, data) => {
                if (err) throw err;

                res.setHeader('Content-Type', 'text/javascript');
                res.statusCode = 200;
                res.write(data);
                res.end()
            })
        }


        fs.readFile(url.substr(1, url.length) + '.html', function (err, data) {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/html', });
                data = data.toString().replace("{{name}}", "Zero");
                data = data.toString().replace("{{header}}", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum sit amet tortor tempor pharetra. Fusce gravida urna eros, nec rhoncus tortor gravida ut. Cras sem magna, efficitur quis porttitor in, accumsan ut erat. Ut varius ligula libero, at mattis mi suscipit ac. Vestibulum faucibus neque ullamcorper enim blandit, eu imperdiet orci laoreet. Nunc malesuada pellentesque magna, vel luctus erat varius non. Nam accumsan eget libero a imperdiet. Donec egestas neque accumsan dignissim varius. Vestibulum dictum vel arcu consequat dignissim. Donec tincidunt blandit elit ac rutrum. Suspendisse gravida auctor neque, ac fermentum augue sagittis at. Ut nec ultrices justo, in placerat velit. Morbi turpis dolor, efficitur non nisl varius, porta viverra lorem. Vestibulum convallis tortor quam, sed imperdiet nulla semper sed. Praesent pharetra felis vel libero fermentum convallis");
                data = data.toString().replace("{{footer}}", "Привествую на нашем сайте");
                res.write(data)
                res.end();
            } else {

                fs.readFile('404.html', function (err, data) {
                    res.writeHead(400, { 'Content-Type': 'text/html', });
                    res.write(data)
                    res.end();
                }
                );
            }
        })

    }
}
);


server.listen(port, hostname, () => {
    console.log('Server is running!')
})