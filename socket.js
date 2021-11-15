var socketio = require('socket.io');
var http = require('http');
var fs = require('fs');


//サーバを建てる(ポートは3000番)
// var server = http.createServer(function (req, res) {
//     //ヘッダー，コンテンツのタイプを入力
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     //index.htmlを読み込み表示し，レスポンス(res)を終了する
//     res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
// }).listen(3000);

let server = http.createServer();

server.on("request", getJs);
server.listen(3000);
console.log("Server running …");
function getJs(req, res) {
  let url = req.url;
  console.log(url);
  switch(url){
  case "/":
    fs.readFile("./index.html", "UTF-8", function (err, data) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
    break;
    case "/index.js":
    fs.readFile("./index.js", "UTF-8", function (err, data) {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data); 
      res.end();
    });
    break;
}
}

//サーバでsocket.io(双方向通信)を可能にする?
//var io = socketio.listen(server); //listenメソッドがバージョンアップで使えなくなった
var io = socketio(server);

//サーバとクライアントの接続が起きた際の処理を記述
io.sockets.on('connection', function (socket) {
    //クライアント(ブラウザ)からサーバへの通信が行われた際の処理を記述
    socket.on('client_to_server', function (data) {
        //サーバからクライアントへの通信が行われた際の処理を記述
        //data.value:入力した文字列?を各クライアントに分け与える(emitする)
        io.sockets.emit('server_to_client', { value: data.value });
    });
});