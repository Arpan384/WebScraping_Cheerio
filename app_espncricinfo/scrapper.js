const cheerio = require("cheerio")
const request = require("request")
const fs = require("fs");

var seriesId = process.argv.slice(2)[0]

console.log(seriesId);

request(`https://www.espncricinfo.com/scores/series/${seriesId}/`, function(err, res, html){
    console.log(res["statusCode"])
    if(err==null && res.statusCode==200){
        console.log("call")
        parseHtml(html);
    }else if(err!=null){
        console.log(err.status)
    }
    else{
        console.log(err)
    }
})

function parseHtml(html){
    let co = cheerio.load(html);
    var matchesData = co(".cscore.cscore--final.cricket.cscore--watchNotes")
    for(let i=0; i<matchesData.length; i++){
        let teams = co(matchesData[i]).find(".cscore_name.cscore_name--abbrev");
        console.log("MATCH : " +(i+1));
        console.log(co(matchesData[i]).find(".cscore_info-overview").html())
        console.log(co(teams[0]).html() + "   vs   " + co(teams[1]).html())
        console.log("Result: "+ co(matchesData[i]).find(".cscore_notes_game").html())
        console.log();
    }
    // fs.writeFileSync("./abc.html", matchesData);
}