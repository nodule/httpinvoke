output = function() {
  httpinvoke($.url, 'GET', function (err, val) {
    if (err) {
      cb({error: $.create(err)})
    } else {
      cb({
        body: $.create(val.body),
        statusCode: $.create(val.statusCode),
        headers: $.create(val.headers)
      })
    }
  })
}
