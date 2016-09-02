onmessage = function (e) {

  var message = "OK";

  postMessage({ id : e.data.id, message, mode : 'resolve' });


};
