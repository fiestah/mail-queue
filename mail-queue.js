var Q = require('q');
var ironMq = require('iron_mq');
var queue;

exports.configure = function (options) {
  var imq = new ironMq.Client({
    token: options.token,
    project_id: options.projectId
  });

  queue = imq.queue('Mail');
};

exports.post = function (payload) {
  if (!queue) {
    console.error('IronMQ project_id and token are not configured');
    return;
  }

  var body = JSON.stringify(payload);
  return Q.nbind(queue.post, queue)(body).fail(function (err) {
    console.error('IronMQ error:', err.message, body);
  });
};

exports.get = function () {
  return Q.nbind(queue.get, queue)({
    n: 1 // Note that the response is an array if n > 1
  }).then(function (response) {
    response.body = JSON.parse(response.body);
    return response;
  });
};

exports.del = function (messageId) {
  return Q.nbind(queue.del, queue)(messageId);
};

exports.clear = function () {
  return Q.nbind(queue.clear, queue)();
};
