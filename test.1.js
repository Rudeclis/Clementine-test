var express = require("express");
var app = express();

app.get('/test', function(req, res){
    res.end(req.url);
})

function decodeHtml(html) {
   var str = html.replace(/%20/g, " ").substring(1);
   if(isNaN(str) == false){
       return parseFloat(str * 1000);
   } else {
       return str;
   }
}

function naturalTime(time){
    var months = ["January", "February", "March", "May", "April", "June", 'July', 'Augustus', 'September', 'October', 'November', 'December']
    return months[time]
}

app.all("*", function(req, res){
    var url = decodeHtml(req.url);
    var date = new Date(url)
    var dateUnix = ""
    var dateNatural = ""
    if(date.toString() == "Invalid Date"){
        dateUnix = NaN;
        dateNatural = NaN;
    } else {
    dateUnix = date.getTime()
    dateNatural = date.getDate() + " " + naturalTime(date.getMonth()) + ", " + date.getFullYear()
    }
    
    var time = ["UNIX time: " + dateUnix/1000 + " Natural Time: " + dateNatural]
    res.end(time.toString())
    
})


app.listen(8080);