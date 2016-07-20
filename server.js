var request = require('request');
var Twitter = require('twitter');
var moment = require('moment');
var trend =[];
var usrTw=[];
var time= new Date();




http = require ('http');
handle = (req, res) -> res.end "hit";
server = http.createServer handle;
server.listen process.env.PORT || 5000;

var client = new Twitter({
  consumer_key: 'WvqEnIWXqhmjXLpCJLHrNlKtR',
  consumer_secret: 'SpEyaZgOvAMYYFvzl8JHrKrEXq9PDeQVgIZVL5iXwTIYobQXY8',
  access_token_key: '755848358695018497-Vtb5AFv3oInEl9w2apyTlYO14utgYwn',
  access_token_secret: 'mRLWPIwTlG0HVMpwCYg2Wn3NiR22L0SjeanXtnYAY7bns'
});


setInterval(function () {
  request('http://www.mmoserverstatus.com/pokemon_go', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //var mmoSrv = body;
      var foo = body.slice(body.indexOf('Argentina'),(body.indexOf('Argentina')+50));
      if (foo.indexOf('green')===-1) {
        sendTweet('Server Down ❌ 😤 ( '+Math.round((((new Date() - time)/(1000*60))+22))+' Minutos 🕗) #pokemongoarg #pokemongoargentina #pokemonGo #PokemonGoArgentina @PokemonGoArg @pkmgoargentina');
      }else {
        sendTweet('Server Up ✔️⬆️😁');
      }
    }
  });

  function sendTweet(msg) {
    client.post('statuses/update', {status: msg}, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }else {
        console.log(error);
      }
    });
  }

}, 60000*5);
