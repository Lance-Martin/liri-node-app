# liri-node-app
## LIRI is a language interpretation and recognition interface
#### LIRI can: Retrieve your last 20 tweets, search any song to retrieve the stats along with a spotify link for the top twenty results, and can give you a movie description for any movie you search.  
###### To get LIRI ready for use follow these steps:
###### Make sure you have node.js installed.
###### 1. Clone this repository.
###### 2. Make a file named keys.js
###### 3. Inside of keys.js copy this:
```
console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: '<your key here>',
  consumer_secret: '<your key here>',
  access_token_key: '<your key here>',
  access_token_secret: '<your key here>',
}
```
###### 4. Head over to  https://apps.twitter.com/app/new and sign up.
###### 5. Once you have your credentials fill them into your keys.js file.
###### 6. In your command line type `npm install` to install the necessary npm packages.
##### LIRI is now ready for use.
##### To use LIRI:
###### 1. In your command line navigate to the liri-node-app directory.
###### 2. To retrieve your tweets type: `node liri.js my-tweets`
###### 3. To search a song type: `node liri.js spotify-this-song "song title"`
###### 4. To search a movie type: `node liri.js movie-this "movie title"`
###### 5. To run the commands in random.txt type: `node liri.js do-what-it-says`
