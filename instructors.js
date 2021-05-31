const fs = require("fs");
const data = require("./data.json");

// CREATE 
exports.post = function(req, res) {
    // Valida se todos os dados estão preenchidos, antes de enviar os dados para o DB
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if (req.body[key] == "") 
            return res.send('Please, fill all filds!');
    }

    req.body.birth = Date.parse(req.body.birth);
    req.body.created_at = Date.now();
    
    data.instructors.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) 
            return res.send("Write file err");

        return res.redirect("/instructors");
    })

    return res.send(req.body);
}
