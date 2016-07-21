var request = require('request');
var Twitter = require('twitter');
var moment = require('moment');
var trend =['#pokemongoarg','#pokemongoargentina','#pokemonGo', '#PokemonGoArgentina','#LiberenPokemonGoArgentina','@PokemonGoArg','@PokemonGoApp','@pkmgoargentina','@PokemonGo_ARG','@PokemonGOLATAM','@CentroPokemon','@EquipoMysticArg','@PokemonGoBsAs'];
var time= new Date();
var ArrayMentions=[];


//just for heroku//
http = require ('http');
function handle (req, res){
  res.end('hit');
}
var server = http.createServer (handle);
server.listen (process.env.PORT || 5000);
//

var client = new Twitter({
  consumer_key: 'WvqEnIWXqhmjXLpCJLHrNlKtR',
  consumer_secret: 'SpEyaZgOvAMYYFvzl8JHrKrEXq9PDeQVgIZVL5iXwTIYobQXY8',
  access_token_key: '755848358695018497-Vtb5AFv3oInEl9w2apyTlYO14utgYwn',
  access_token_secret: 'mRLWPIwTlG0HVMpwCYg2Wn3NiR22L0SjeanXtnYAY7bns'
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

function completeTweet() {
  var singleTrend = Math.floor(Math.random()*trend.length-0+1)+0;
  if (ArrayMentions.length<5) {
    if (ArrayMentions.indexOf(trend[singleTrend])===-1) {
      ArrayMentions.push(trend[singleTrend]);
    }
  completeTweet();
  }
  return ArrayMentions.join();
}

setInterval(function () {
  completeTweet();
  request('http://www.mmoserverstatus.com/pokemon_go', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //var mmoSrv = body;
      var foo = body.slice(body.indexOf('Argentina'),(body.indexOf('Argentina')+50));
      if (foo.indexOf('green')===-1) {
        sendTweet('Server Down ❌ 😤'+ completeTweet() );
        ArrayMentions.length=0;
      }else {
        sendTweet('Server Up ✔️⬆️😁');
      }
    }
  });
}, 1000*60*15);
