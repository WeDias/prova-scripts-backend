const express = require("express");
const app = express();
const cors = require("cors");
// para conversão de application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// cors() é para aceitar requisições de qualquer domínio
app.use(cors());
const { insert, select, del } = require("./sql");
//usar a variável de ambiente PORT
const PORT = process.env.PORT || 3101;

//define a porta e a função callback a ser executada após o servidor iniciar
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}...`);
});

app.get("/", (req, res) => {
  res.send("Forneça a URL correta");
});

app.get("/select", async (req, res) => {
  res.send(await select());
});

app.get("/insert/:origem", async (req, res) => {
  res.send(await insert(req.params.origem));
});

app.get('/del/:idregistro', async (req, res) => {
    res.send(await del(req.params.idregistro))
});