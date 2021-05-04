// CREATE 
exports.post = function(req, res) {
    // Valida se todos os dados estão preenchidos, antes de enviar os dados para o DB
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if (req.body[key] == "") 
            return res.send('Please, fill all filds!');
    }

    return res.send(req.body);
}
