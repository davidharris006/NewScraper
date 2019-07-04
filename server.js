var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express")
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;
var app = express()


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



console.log("");

var results = [];
axios.get("https://www.huffpost.com/").then(function(response) {
  
  var $ = cheerio.load(response.data);
  
  
  $("div.card__headline__text").each(function(i, element) {
    
    var title = $(element).text();
    
    var link = $(element).parent().attr("href");
    
    var image = $(element).parents("div.card__content").find("img.card__image__src").attr("src");

    results.push({
      title: title,
      link: link,
      image: image
    });
  });

  
  
  
  
  
  console.log(results);
}).then(function(){

  app.get("/", function(req, res) {
    
    res.render("index", {result : results});
    
  });
})

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});