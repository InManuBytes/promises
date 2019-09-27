/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      callback(err, null);
    } else {
      // the data we get is in a buffer, we have to convert to string
      // new lines start with \n a return character
      // and we just need the first one, so it's the first element in the array
      var firstLine = fileData.toString('utf8').split('\n')[0];
      callback(err, firstLine);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request.get(url, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(error, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
