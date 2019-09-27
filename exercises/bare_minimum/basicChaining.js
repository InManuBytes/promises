/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // (1) reads a GitHub username from a `readFilePath`
  //     (the username will be the first line of the file)
  return pluckFirstLineFromFileAsync(readFilePath)
    // (2) then, sends a request to the GitHub API for the user's profile
    .then( (username) => {
      return getGitHubProfileAsync(username);
    })
    // (3) then, writes the JSON response of the API to `writeFilePath`
    .then( (body) => {
      var fileData = JSON.stringify(body);
      fs.writeFile(writeFilePath, fileData, 'utf8', (error) => {
        console.log(fileData);
        if (error) { throw error; }
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
