var worker = new Worker('worker.js'),

  callbacks = {};


worker.onmessage = function (e) {
  
  if (callbacks[e.data.id]) {
    if (e.data.mode == "resolve") {
      callbacks[e.data.id].resolve(e.data.message);
    } else if (e.data.mode == "reject") {
      callbacks[e.data.id].reject(e.data.message);
    }

    delete callbacks[e.data.id];
  }
}

function getId () {
  return Math.random().toString(36).substring(7);
}

function getResult (message) {
  var id = getId();

  return new Promise(function (resolve, reject) {
    callbacks[id] = {
      resolve : resolve,
      reject : reject
    }

    worker.postMessage({ id, message })
  });
}