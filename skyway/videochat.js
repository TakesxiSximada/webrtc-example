// -*- coding: utf-8 -*-
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var localStream;
var connectedCall;
var peer = new Peer({ key: 'YOUR API KEY', debug: 3});

peer.on('open', function(){
    $('#my-id').text(peer.id);
});

peer.on('call', function(call){
    connectedCall = call;
    $("#peer-id").text(call.peer);
    call.answer(localStream);
    call.on('stream', function(stream){
        var url = URL.createObjectURL(stream);
        $('#peer-video').prop('src', url);
    });
});

$(function() {
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        var url = URL.createObjectURL(stream);
        $('#my-video').prop('src', url);
    }, function() { alert("Error!"); });
    $('#call-start').click(function(){
        var peer_id = $('#peer-id-input').val();
        var call = peer.call(peer_id, localStream);
        call.on('stream', function(stream){
            $("#peer-id").text(call.peer);
            var url = URL.createObjectURL(stream);
            $('#peer-video').prop('src', url);
        });
    });

    $('#call-end').click(function(){
        connectedCall.close();
    });
});
