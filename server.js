const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const lista_produtos = {
  produtos: [
    {
      id: 1,
      descricao: "Arroz parboilizado 5Kg",
      valor: 25.0,
      marca: "Tio João",
    },
    { id: 2, descricao: "Maionese 250gr", valor: 7.2, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.5, marca: "Itambé" },
    {
      id: 4,
      descricao: "Batata Maior Palha 300gr",
      valor: 15.2,
      marca: "Chipps",
    },
    { id: 5, descricao: "Nescau 400gr", valor: 8.0, marca: "Nestlé" },
  ],
};

// Routes

app.get("/produtos", (req, res) => {
  res.json(lista_produtos);
});

app.get("/produtos/:id", (req, res) => {
  const produto = lista_produtos.produtos.find(
    (p) => p.id === parseInt(req.params.id)
  );
  if (!produto) return res.status(404).send("Produto não encontrado.");
  res.json(produto);
});

app.post("/produtos", (req, res) => {
  const produto = {
    id: lista_produtos.produtos.length + 1,
    descricao: req.body.descricao,
    valor: req.body.valor,
    marca: req.body.marca,
  };
  lista_produtos.produtos.push(produto);
  res.json(produto);
});

app.put("/produtos/:id", (req, res) => {
  const produto = lista_produtos.produtos.find(
    (p) => p.id === parseInt(req.params.id)
  );
  if (!produto) return res.status(404).send("Produto não encontrado.");

  produto.descricao = req.body.descricao || produto.descricao;
  produto.valor = req.body.valor || produto.valor;
  produto.marca = req.body.marca || produto.marca;

  res.json(produto);
});

app.delete("/produtos/:id", (req, res) => {
  const index = lista_produtos.produtos.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (index === -1) return res.status(404).send("Produto não encontrado.");

  const produto = lista_produtos.produtos.splice(index, 1);
  res.json(produto);
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});