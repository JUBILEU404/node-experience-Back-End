const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;
// teste 1
exports.create = (req,res) => {
   if (!req.body.name) {
       res.status(400).send({
           message: "o conteudo não pode ser vazio!"
       });
       return;
   }
   const item = {
       name: req.body.name,
       decription: req.body.description,
       quantity: req.body.quantity,
       is_flammable: req.body.is_flammable ? req.body.is_flammable : false
        }
       Item.create(item)
       .them(data =>{
           res.send(data);
       })
     .catch(err =>{
         res.status(500).send({
             message:
             err.message || "Ocorreu um erro ao criar o item."
         })
     }) 
    };
exports.findALL = (req,res) => {
   const name = req.body.name;
   var condition = name ? { name: { [Op.like]: `%${name}%` }} : null;

   Item.findALL({where: condition})
   .them(data =>{
       res.send(data);
   })
 .catch(err =>{
     res.status(500).send({
         message:
         err.message || "Ocorreu um erro ao criar ao listar os item."
     })
 }) 
};

exports.findOne = (req,res) => {
   const id = req.params.id;
   Item.findByPk(id)
    .then(data =>{
        if(data){
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não foi possivel encrotrar um item com o id= ${id}.`
            });
        }
    })
  .catch(err =>{
      res.status(500).send({
          message: "Ocorreu um erro ao tentar encontrar um item com o id ="+ id
      });
  });
};
exports.update = (req,res) => {
   const id = req.params.id;
   Item.update(req.body, {
       where : {id:id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: "O item foi alulizado de maneira bem sucedida."
           });

       } else {
           res.send({
               message: `Nao foi possivel atualizar  o item com o id= ${id}.`
           });
       }
   })
 .catch(err => {
     res.status(500).send({
         message: "Ocoreu um erro ao tentar atualiza o item do id="+ id
     })
 })
};

exports.delete = (req,res) => {
const id = req.params.id;
     Item.destroy({
     whre: {id:id}
      })
.then(num => {
    if (num==1) {
        res.send({
            message: "O item foi  apagado com secesso!"
        });
    } else { 
        res.send({
            message: `Não foi possivel apagar o item com id ${id}.`
        });
        
    }
})
.catch(err => {
    res.status(500).send({
        message: "ocoreu um erro ao tentar apagar o item com id =" + id
    })
})
};

exports.deleteALL = (req,res) => {
Item.destroy({
    where: {},
    truncate: false
})
.then(nums =>{
    res.send({ message: `${nums} Itms foram apagados com sucesso.`});
})
.catch(err => {
    res.status(500).send({
        message:
        err.message || "Algum erro occreu ao tenta apagar todos os items solicitados"
    });
});
};

exports.findALLFlammabes = (req,res) => {
Item.findALL({ where: {isFlammable: true }})
.then(data => {
    res.send(data);
})
.catch(err =>{
    res.status(500).send({
        message:
        err.message || "Algum erro ocorreu ao tentar apagar todas os items."
    });
})
};