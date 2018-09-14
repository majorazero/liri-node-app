let dotenv = require("dotenv").config();
let key = require("./key.js");
let request = require("request");
let moment = require("moment");
let fs = require("fs");
let command = process.argv[2];
let arg = "";
let Spotify = require("node-spotify-api");
let spot = new Spotify({
  id: key.spotify.id,
  secret: key.spotify.secret
});

for(let i = 3; i < process.argv.length; i++){
  arg += process.argv[i];
  if(i !== process.argv.length-1){
    arg += "+";
  }
}

write(command+" "+arg.replace("+"," ")+" "+randomFace());
commandCenter(command);

function commandCenter(command){
  switch(command){
    case "concert-this":
      concert();
      break;
    case "spotify-this-song":
      spotThis();
      break;
    case "movie-this":
      movie();
      break;
    case "do-what-it-says":
      fs.readFile("./random.txt","utf8",function(error,data){
        if(error){
          write(error);
        }
        else {
          let parsedCom = data.substring(0,data.indexOf(" "));
          if(parsedCom !== "do-what-it-says"){
            let parsedInp = data.substring(data.indexOf(" ")+1);
            arg = parsedInp;
            commandCenter(parsedCom);
          }
          else {
            write("Hey, (┛◉Д◉)┛彡┻━┻ what are you trying to pull here!");
          }
        }
      });
      break;
    default:
      write("Sorry, (┛✧Д✧))┛彡┻━┻ I don't know that command.");
  }
}
function concert(){
  request("https://rest.bandsintown.com/artists/"+arg+"/events?app_id=codingbootcamp",function(error,response,body){
    if(error){
      write(error);
    }
    else {
      let responseDat = JSON.parse(body);
      for(let i = 0; i < responseDat.length; i++){
        write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
        write("Venue Name: "+responseDat[i].venue.name);
        write("City :"+responseDat[i].venue.city+", "+responseDat[i].venue.country);
        write("Date :"+moment(responseDat[i].datetime).format("MM/DD/YYYY"));
        write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
      }
    }
  });
}

function spotThis(){
  let url = "https://api.spotify.com/v1/search?q="+arg+"&limit=3&type=track";
  if(arg === ""){
    url = "https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE";
    console.log("Pulling data from spotify... ヽ༼ °⊱,° ༽ﾉ");
    spot.request(url)
      .then(function(response){
        write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
        write("Artist(s): "+response.artists[0].name);
        write("Song Name: "+response.name);
        write("Link: "+response.href);
        write("Album: "+response.album.name);
        write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
      });
  }
  else{
    console.log("Pulling data from spotify... ヽ༼ °⊱,° ༽ﾉ");
    spot.request(url)
      .then(function(response){
      for(let i = 0; i<response.tracks.items.length; i++){
        let artists = "";
        write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
        for (let j = 0; j < response.tracks.items[i].artists.length; j++){
          artists += response.tracks.items[i].artists[j].name;
          if(j !== response.tracks.items[i].artists.length-1){
            artists += ", ";
          }
        }
        write("Artist(s): "+artists);
        write("Song Name: "+response.tracks.items[i].name);
        if(response.tracks.items[i].preview_url === null){
          write("Link: Oops no URL. Sorry, Spotify sucks!");
        }
        else {
          write("Link: "+response.tracks.items[i].preview_url);
        }
        write("Album: "+response.tracks.items[i].album.name);
        write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
      }
    });
  }
}

function movie(){
  if(arg === ""){
    arg = "Mr. Nobody";
  }
  request("http://www.omdbapi.com/?t="+arg+"&y=&plot=short&apikey=trilogy",function(error,response,body){
    let rotScore = "N/A";
    if (error){
      write(error);
    }
    else {
      let movieData = JSON.parse(body);
      write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
      write("Title: "+movieData.Title);
      write("Year: "+movieData.Year);
      write("IMDB Rating: "+movieData.imdbRating);
      for(let i = 0; i < movieData.Ratings.length; i++){
        if(movieData.Ratings[i].Source === "Rotten Tomatoes"){
          rotScore = movieData.Ratings[i].Value;
        }
      }
      write("Rotten Tomatoe Rating: "+rotScore);
      write("Country: "+movieData.Country);
      write("Plot: "+movieData.Plot);
      write("Actors: "+movieData.Actors);
      write("━━━ヽ(ﾟ∀ﾟ)ﾉ━( ﾟ∀)ﾉ━(　　ﾟ)ﾉ━ヽ(　　)ﾉ━ヽ(ﾟ　　)━ヽ(∀ﾟ )ﾉ━ヽ(ﾟ∀ﾟ)ﾉ ");
    }
  });
}

function write(text){
  console.log(text);
  fs.appendFile("./log.txt",text+"\n",function(err,data){
    if(err){
      console.log(err);
    }
  });
}

function randomFace(){
  let randomNum = Math.floor(Math.random()*4);
  switch(randomNum) {
    case 0:
      return "(´∀｀)";
      break;
    case 1:
      return "ᕦ(ಠ_ಠ)ᕤ";
      break;
    case 2:
      return "ᕕ( ⌓̈ )ᕗ";
      break;
    case 3:
      return "ヽ༼◉ل͜◉༽ﾉ";
      break;
  }
}
