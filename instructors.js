const fs = require("fs");
const data = require("./data.json");

// CREATE 
exports.post = function(req, res) {
    // Valida se todos os dados estão preenchidos, antes de enviar os dados para o DB
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if (req.body[key] == "") 
            return res.send('Erro: please, fill all filds!');
    }

    // Desestruturação do objeto
    let { avatar_url, name, birth, gender, services } = req.body;

    // Tratamento dos dados
    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    // Envia os dados
    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    });

    // Cria arquivo DATA JSON
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) 
            return res.send("Write file err");

        return res.redirect("/instructors");
    })

    return res.send(req.body);
}

// SHOW
exports.show = function(req, res) {
    const { id } = req.params;

    const foundInstructors = data.instructors.find(function(instructor) {
        return instructor.id == id;
    });

    if (!foundInstructors) return res.send("Instructor not found! 🙁")

    return res.send(foundInstructors);
} 
