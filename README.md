# mail-queue
A thin wrapper around [iron-io/iron_mq_node](https://github.com/iron-io/iron_mq_node) for queuing up transactional emails.

It does this:

- `JSON.stringify()`'s the request message body
- `JSON.parse()`s the response message body
- Returns a Q promise

The available email types and its payload can be found on [fiestah/mailer](https://github.com/fiestah/mailer/tree/master/emails).


## Configure Once:
``` js
// In app.js bootstrap
var mailq = require('mail-queue');
mailq.configure({
  token: '...',
  projectId: '...'
});
```


## Usage:

All methods return a Q promise, so you can chain them using `.then()` or `.fail()` and so on.

``` js

// Queue up an email, fire and forget. Logs to stderr if the request fails
mailq.post({
  type: 'planner-welcome',
  data: '4f70c613d0374f7813000001' // user id
});

// Clear the queue (useful for tests, automations etc.)
mailq.clear().then(function () {
  // do something
})
.done();
```
