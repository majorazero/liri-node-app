let dotenv = require("dotenv").config();
let key = require("./key.js");
let request = require("request");
let moment = require("moment");
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

switch(command){
  case "concert-this":
    request("https://rest.bandsintown.com/artists/"+arg+"/events?app_id=codingbootcamp",function(error,response,body){
      if(error){
        console.log(error);
      }
      else {
        let responseDat = JSON.parse(body);
        for(let i = 0; i < responseDat.length; i++){
          console.log("/////////");
          console.log("Venue Name: "+responseDat[i].venue.name);
          console.log("City :"+responseDat[i].venue.city+", "+responseDat[i].venue.country);
          console.log("Date :"+moment(responseDat[i].datetime).format("MM/DD/YYYY"));
          console.log("/////////");
        }
      }
    });
    break;
  case "spotify-this-song":
    if(arg === ""){
      arg = "The Sign";
    }
    spot.search({
      type: "track",
      limit: 3,
      query: arg
    }).then(function(response){
      for(let i = 0; i<response.tracks.items.length; i++){
        let artists = "";
        console.log("/////////");
        for (let j = 0; j < response.tracks.items[i].artists.length; j++){
          artists += response.tracks.items[i].artists[j].name;
          if(j !== response.tracks.items[i].artists.length-1){
            artists += ", ";
          }
        }
        console.log("Artist(s): "+artists);
        console.log("Song Name: "+response.tracks.items[i].name);
        console.log("Link: "+response.tracks.items[i].href);
        console.log("Album: "+response.tracks.items[i].album.name);
        console.log("/////////");
      }
    });
    break;
  case "movie-this":
      if(arg === ""){
        arg = "Mr. Nobody";
      }
      request("http://www.omdbapi.com/?t="+arg+"&y=&plot=short&apikey=trilogy",function(error,response,body){
        let rotScore = "N/A";
        if (error){
          console.log(error);
        }
        else {
          let movieData = JSON.parse(body);
          console.log("/////////");
          console.log("Title: "+movieData.Title);
          console.log("Year: "+movieData.Year);
          console.log("IMDB Rating: "+movieData.imdbRating);
          for(let i = 0; i < movieData.Ratings.length; i++){
            if(movieData.Ratings[i].Source === "Rotten Tomatoes"){
              rotScore = movieData.Ratings[i].Value;
            }
          }
          console.log("Rotten Tomatoe Rating: "+rotScore);
          console.log("Country: "+movieData.Country);
          console.log("Plot: "+movieData.Plot);
          console.log("Actors: "+movieData.Actors);
          console.log("/////////");
        }
      });
    break;
  case "do-what-it-says":
    break;
  default:
    console.log("Sorry, :d! I don't know that command.");
}
