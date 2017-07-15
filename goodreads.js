// FOR TESTING: UPDATE BY ADDING GOODREADS KEY AND SECRET
let key = 'o5rVqairFPY3P9AdqQZrgw'
let secret = 'XC3z0WhDPoVTilPJja3qo5w8skObpMHWKJO8cG1e1o'

// Require the client
const goodreads = require('goodreads')
const http = require('http')
const url = require('url')

let sample_user = 4085451


// let onRequest = function(req, res) {
  // let parse = url.parse(req.url, true)
  // let { pathname } = parse, gr
  let dump = json => {
    json && res.write(JSON.stringify(json));
    console.log('im in the dump -----', json.GoodreadsResponse.books[0].book[0]);
    res.end()
  // }

  // switch (pathname) {

    // Get a user's shelf
    // case '/shelf': case '/shelf/':
      gr = goodreads.client({ 'key': key, 'secret': secret })
      let shelfOptions = {'userID': sample_user, 'shelf': 'web', 'page': 1, 'per_page': 100}

      let getShelf = gr.getSingleShelf(shelfOptions, dump);
      return getShelf
  // }
};

// http.createServer(onRequest).listen(3000);

// console.log('server started on port 3000');