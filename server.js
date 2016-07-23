
var request = require('request');
var Twitter = require('twitter');
var moment = require('moment');
var trend =['#pokemongoarg','#pokemongoargentina','#pokemonGo', '#PokemonGoArgentina',
            '#LiberenPokemonGoArgentina','@PokemonGoArg','@PokemonGoApp','@pkmgoargentina',
            '@PokemonGo_ARG','@PokemonGOLATAM','@CentroPokemon','#ArgentinaWantsPokemonGo','@EquipoMysticArg','@PokemonGoBsAs'
];
var time= new Date();
var ArrayMentions=[];

var client = new Twitter({
  consumer_key: 'sXaV5ZEL9C1RLUheSvXjKTLE0',
  consumer_secret: 'Wbsp3JAIN3CEZni6p414fdESJiecF6pMkwU1UJXD83HpVVog2c',
  access_token_key: '756210155109412864-GEmWiskjHlONUaUXQIxhzXypAHyKcdy',
  access_token_secret: 'wGUIdp5PYnEeuvFIEF82Lxjt9dZ5joq9TajfehJh41WXX'
});

/**
 * [sendTweet :tweet a Tweet ^o^]
 * @param  {[string]} msg [it's contains the text to tweet]
 */
function sendTweet(msg) {
  client.post('statuses/update', {status: msg}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }else {
      console.log(error);
    }
  });
}

/**
 * [completeTweet :fill an Array with 5 trendingTopics & users, recurcive]
 * @return {[string]} [string with the data from the array, comma separated]
 */
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

/**
 * [to solve problem with Heroku's env.PORT assign, dont know why, but work's]
 */
http = require ('http');
function handle (req, res){
  res.end('hit');
}
var server = http.createServer (handle);
server.listen (process.env.PORT || 5000);
//

/**
 * [setInterval : Main function, Every 15 mins a GET request are made to mmoserverstatus, get the body
 * and finaly check for a specific string's if everything goes well ,a tweet it's fired up 🔥]
 * @param {[type]} function ( [description]
 */
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
}, 1000*60*60);
