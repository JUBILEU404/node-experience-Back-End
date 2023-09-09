module.exports = app => {
    const item = require("../controllers/item.controller");

    var router = require("express").Router();

    router.post("/", item.create);

    router.get("/", item.findALL);

    router.get("/Flammabless", item.findALLFlammabes);

    router.get("/:id", item.findOne);

    router.put("/:id", item.update);

    router.delete("/:id", item.delete);

    router.delete("/", item.deleteALL);

    app.use('/api/items', router);
    
};