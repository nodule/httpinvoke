module.exports = {
  name: "get",
  ns: "httpinvoke",
  description: "A HTTP get request",
  phrases: {
    active: "Requesting url {{input.url}}"
  },
  ports: {
    input: {
      url: {
        type: "string",
        format: "url",
        title: "Url Request",
        description: "The url to be requested.",
        required: true
      }
    },
    output: {
      error: {
        title: "Error",
        type: "object"
      },
      body: {
        title: "Body",
        type: "string"
      },
      statusCode: {
        title: "Status Code",
        type: "string"
      },
      headers: {
        title: "Reply Headers",
        type: "object"
      }
    }
  },
  dependencies: {
    npm: {
      httpinvoke: require('httpinvoke')
    }
  },
  fn: function get(input, $, output, state, done, cb, on, httpinvoke) {
    var r = function() {
      httpinvoke($.url, 'GET', function(err, val) {
        if (err) {
          output({
            error: $.create(err)
          })
        } else {
          output({
            body: $.create(val.body),
            statusCode: $.create(val.statusCode),
            headers: $.create(val.headers)
          })
        }
      })
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}