const express = require('express');
// const cors=require('cors')

let app = express();

// app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/./client'))
app.use(express.json())
// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Header","Origin, X-Request-Width, Content-Type, Accept");
//     next()
// });

app.post('/', function (req, res) {
    let data = []
    data.push(req.body)
    res.send(`${JsonToCSV(data).join('\n').replace(/,/g, ',')}`)
});

let port = 3001;

app.listen(port, () => {
    console.log(`listening `);
});

function JsonToCSV(data) {
    let CSV = data.map(obj => Object.values(obj));
    let children = CSV[0][CSV[0].length - 1]
    CSV[0].pop()//deleting children
    if (children.length > 0) {
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                let rec = []
                rec = JsonToCSV([children[i]])
                rec.shift()
                for (let i = 0; i < rec.length; i++) {
                    CSV.push(rec[i])
                }
            }
        }
    }

    let keys = Object.keys(data[0])
    keys.pop()
    CSV.unshift(keys);
    return CSV;
}