const  db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "O conteudo não pode ser vazio!"
        });
        return;
    }

    const item = {
     name: req.body.name,
     description: req.body.description,
     quantity: req.body.quantity,
     isFlammable: req.body.isFlammable ? req.body.isFlammable : false       
    };

    Item.create(item)
    .then(data => {
    res.send(data);
    })

.catch(err => {
    res.status(500).send({
        message:
        err.message || "Ocorreu um erro ao criar o item."
    })
})
};


exports.findAll = (req, res) => {
    const name = req.body.name;
    var condition = name ? { name: { [Op.like]: `%${name}$%` } } : null;

    Item.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocorreu um erro ao Listar os items."
        })
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findByPk(id)
    .then(data => {
        if (data){
            res.send(data);
        } else {
            res.status(404).send({
                messege: `Não foi possivel encontrar um item com o id=${id}.`
            }); 
        }
    })
    .catch(err =>{
        res.status(500).send({
                message: "Ocorreu um erro ao tentar encontrar um item com o id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;


    Item.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "O item foi atualizado com sucesso"
            });
        } else {
            res.send({
                message: `Não foi possivel atualizar o item=${id}.`
            });
        }
    })
};

exports.delete = (req, res) => {
    
};

exports.deleteALL = (req, res) => {

};

exports.findAllflammabes = (req, res) => {

};