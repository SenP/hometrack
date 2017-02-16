var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
    try {
        if (!req.body.payload || typeof req.body !== "object") {
            throw "Could not decode request: JSON parsing failed"
        }
        result = processRequest(req.body.payload);
        res.json(result);
    } 
    catch (e) {
        res.status(400).json({
            "error": e
        });
    }
});

function processRequest(req) {
    let response =  req
                    .filter(property => property.workflow === "completed" && property.type === "htv")
                    .map(prop => {
                        let p = prop.address;
                        return {
                            concataddress: `${p.buildingNumber} ${p.street} ${p.suburb} ${p.state} ${p.postcode}`,
                            type: prop.type,
                            workflow: prop.workflow
                        }
                    });

     return { response }
}

let server = app.listen(process.env.PORT || 3000, process.env.IP || "localhost", function(){
   console.log("server started listening at port: " + server.address().port);
});