/**
 * 封装一个 jQuery.ajax
 */

window.jQuery = function (nodeOrSelector) {
  let nodes = {}
  nodes.addClass = function () { }
  nodes.setText = function () { }
  return nodes
}

window.$ = window.jQuery

window.jQuery.ajax = function ({ url, method, body, headers }) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    request.open(method, url)
    for (let key in headers) {
      let value = headers[key]
      request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resolve.call(undefined, request.responseText)
        } else if (request.status >= 400) {
          reject.call(undefined, request)
        }
      }
    }
    request.send(body)
  })
}

mybutton.addEventListener('click', (e) => {
  let promise = $.ajax({
    url: '/xxx',
    method: 'post',
    body: 'a=1&b=2',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Janice': '18'
    }
  })
  promise.then(
    (text) => { console.log(text) },
    (request) => { console.log(request.status) }
  )
})