//var key = require('keys.js');
var spotify = require('spotify');
var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var key = require('./keys.js');
function tweet(){
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
}
function movie(title) {
  request('https://www.omdbapi.com/?t='+title+"&tomatoes=true", function (err, data) {
    if (err !== null) {
    console.log(err);
    console.log("=======================");
    console.log("=======================");
    console.log("Movie title: Mr. Nobody.");
    console.log('');
    console.log("Year made: 2009");
    console.log('');
    console.log("IMDB Rating: 7.9");
    console.log('');
    console.log("Country: Belgium, Germany, Canada, France");
    console.log('');
    console.log("Language: English, Mohawk");
    console.log('');
    console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
    console.log('');
    console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
    console.log('');
    console.log('Rotten tomatoes rating: 3.8');
    console.log('');
    console.log('Rotten tomatoes url: http://www.rottentomatoes.com/m/mr-nobody/');
    console.log("=======================");
    console.log("=======================");
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
    file =
    fs.appendFile('./changeLog.txt', "\nmovie title: "+ info.Title + ", Year Made: " + info.Year + ", IMDB Rating: "+ info.imdbRating, function(err){
      if(err){
        console.log(err);
      }
    });
  });
}
function music(song) {
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        console.log("=======================");
        console.log("=======================");
        console.log("Artist: Blink-182");
        console.log("");
        console.log("Song name: What's my age again?");
        console.log("");
        console.log("Album name: Enema of the State");
        console.log("");
        console.log("Spotify link: https://open.spotify.com/track/5JXcX7TTLx4l0xFIXJ3DBt");
        console.log("=======================");
        console.log("=======================");
        return;
    }
    for (var i = 0; i < data.tracks.items.length; i ++) {
    console.log("=======================");
    console.log("=======================");
    console.log("Result number: "+ (i+1));
    console.log("");
    console.log("Artist: " +data.tracks.items[i].artists[0].name);
    console.log("");
    console.log("Song name: "+data.tracks.items[i].name);
    console.log("");
    console.log("Album name: "+data.tracks.items[i].album.name);
    console.log("");
    console.log("Spotify link: "+data.tracks.items[i].external_urls.spotify);
    console.log("=======================");
    console.log("=======================");
    }
    fs.appendFile('./changeLog.txt', "\ntop result: "+ data.tracks.items[0].name + ", artist: " + data.tracks.items[0].artists[0].name + ", spotify link: "+ data.tracks.items[0].external_urls.spotify, function(err){
      if(err){
        console.log(err);
      }
    });

  });
}
switch (process.argv[2]) {
    case 'my-tweets':
      tweet();
    break;
    case 'spotify-this-song':
      music(process.argv[3]);
    break;
    case 'movie-this':
      movie(process.argv[3]);
    break;
    case 'do-what-it-says':
      fs.readFile("./random.txt", "utf8", function(err, data){
        if(err){
          console.log("an error has occured: "+err);
        }
        var parsedData = data.trim().split(',');
        for (var i = 0; i < parsedData.length; i++){
            switch(parsedData[i]) {
              case "my-tweets":
                tweet();
              break;
              case 'spotify-this-song':
                music(parsedData[i+1]);
              break;
              case 'movie-this':
                movie(parsedData[i+1]);
              break;
            }
        }
      });
    break;
}
