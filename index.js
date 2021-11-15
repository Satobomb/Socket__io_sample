//サーバと接続(connect)する
var socket = io.connect();

//サーバからクライアントへのアクセスがあった際，dataを表示する
socket.on("server_to_client", function (data) { appendMsg(data.value) });

//textを表示する関数(function)を作成
function appendMsg(text) {
    //idがチャットログの箇所に"<div> +text + </div>"を追加する
    $("#chatlogs").append("<div>" + text + "</div>");
}

$("form").submit(function (err) {
    //messageにmessage-formの値を保存する
    var message = $("#message-form").val();
    //message-formの値を空にする
    $("#message-form").val('');
    //全てのブラウザにmessageを表示する?
    socket.emit("client_to_server", { value: message });
    //イベントが終わらない場合，強制終了させる?
    err.preventDefault();
});