//var key = require('keys.js');
var spotify = require('spotify');
var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var key = require('./keys.js');
switch (process.argv[2]) {
    case 'my-tweets':
      var client = new twitter({
        consumer_key: key.twitterKeys.consumer_key,
        consumer_secret: key.twitterKeys.consumer_secret,
        access_token_key: key.twitterKeys.access_token_key,
        access_token_secret: key.twitterKeys.access_token_secret
        });
        client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response){
        if (!error) {
          console.log(error);
        }
        console.log("======================");
        console.log('');
        console.log("Here's your last 20 tweets:");
        console.log('');
        for(var i = 0; i<tweets.length;i++){
          console.log(tweets[i].text);
          console.log("");
        }
        console.log("======================");
      });
    break;
    case 'spotify-this-song':
      spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("=======================");
        console.log("=======================");
        console.log("Artist: " +data.tracks.items[0].artists[0].name);
        console.log("");
        console.log("Song name: "+data.tracks.items[0].name);
        console.log("");
        console.log("Album name: "+data.tracks.items[0].album.name);
        console.log("");
        console.log("Spotify link: "+data.tracks.items[0].external_urls.spotify);
        console.log("=======================");
        console.log("=======================");

      });
    break;
    case 'movie-this':
      request('https://www.omdbapi.com/?t='+process.argv[3]+"&tomatoes=true", function (err, data) {
        if (!err && data.statusCode == 200) {
        console.log(err); // Show the HTML for the Google homepage.
        }
        var info = JSON.parse(data.body);
        console.log("=======================");
        console.log("=======================");
        console.log("Movie title: "+ info.Title);
        console.log('');
        console.log("Year made: " + info.Year);
        console.log('');
        console.log("IMDB Rating: "+ info.imdbRating);
        console.log('');
        console.log("Country: " + info.Country);
        console.log('');
        console.log("Language: " + info.Language);
        console.log('');
        console.log("Plot: " + info.Plot);
        console.log('');
        console.log("Actors: "+ info.Actors);
        console.log('');
        console.log('Rotten tomatoes rating: '+info.tomatoUserRating);
        console.log('');
        console.log('Rotten tomatoes url: '+info.tomatoURL);
        console.log("=======================");
        console.log("=======================");

      });
    break;
    case 'do-what-it-says':
    break;
}
