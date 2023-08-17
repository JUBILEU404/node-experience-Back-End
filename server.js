const express = require("express");
const cors = require("cors");


const app = express();

var corsOptions = {
    origin: "http://localhost:8881"
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.json({message: "Hello Word!"})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server funcionado na porta ${PORT}.`)
    ;
})