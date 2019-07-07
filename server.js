var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express")
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;
var app = express()
var mongojs = require("mongojs");


var databaseUrl = "huffintonpost";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res){
  res.render("home")
})

console.log("");

var results = [];
app.get("/articles/:id")


app.get("/articles", function(req, res) {
  db.articles.find({}, function(err, found){
    res.render("index", {result : found})
  });

axios.get("https://www.huffpost.com/").then(function(response) {
  
  var $ = cheerio.load(response.data);
  
  
  $("div.card__headline__text").each(function(i, element) {
    
    var title = $(element).text();
    
    var link = $(element).parent().attr("href");
    
    var image = $(element).parents("div.card__content").find("img.card__image__src").attr("src");

    results.push({
      title: title,
      link: link,
      image: image,
      dataid: i,
     comments: []
    });

    results.forEach((item) =>
    db.articles.insert(
       item
    ),
    function(err, inserted) {
      if (err) {
        console.log(err);
      }
      else {
        // Otherwise, log the inserted data
        console.log(inserted);  
      }
    });
  })
  
  ;
// const stuff = 
 
  
  
  
  // console.log(results);
})
})
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});