let key = require("./key.js");
let dotenv = require("dotenv").config();
let request = require("request");
let moment = require("moment");
let command = process.argv[2];

switch(command){
  case "concert-this":
    request("https://rest.bandsintown.com/artists/"+process.argv[3]+"/events?app_id=codingbootcamp",function(error,response,body){
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
    })
    break;
  case "spotify-this-song":
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;
  default:
    console.log("Sorry, :d! I don't know that command.");
}
