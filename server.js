const express = require("express");
const cors = require("cors");
const conexao = require("../database/db");

const app = express();

app.use(cors());
app.use(express.json());

// 1. READ (GET) 
app.get("/chamados", (req, res) => {
  const sql = "SELECT * FROM chamados";

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      return res.status(500).json({ mensagem: "Erro ao consultar chamados.", erro: erro.message });
    }
    res.json(resultados);
  });
});

// 2. CREATE (POST) 
app.post("/chamados", (req, res) => {
  const { titulo, descricao, setor_solicitante, prioridade, status_, data_criacao } = req.body;
  const sql = "INSERT INTO chamados (titulo, descricao, setor_solicitante, prioridade, status_, data_criacao) VALUES (?, ?, ?, ?, ?, ?)";

  conexao.query(sql, [titulo, descricao, setor_solicitante, prioridade, status_, data_criacao], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ mensagem: "Erro ao cadastrar chamado.", erro: erro.message });
    }
    res.status(201).json({
      mensagem: "Chamado cadastrado com sucesso.",
      id: resultado.insertId,
      titulo,
      descricao,
      setor_solicitante,
      prioridade,
      status_,
      data_criacao
    });
  });
});

// 3. UPDATE (PUT) 
app.put("/chamados/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, setor_solicitante, prioridade, status_ } = req.body;

  const sql = "UPDATE chamados SET titulo = ?, descricao = ?, setor_solicitante = ?, prioridade = ?, status_ = ? WHERE id = ?";

  conexao.query(sql, [titulo, descricao, setor_solicitante, prioridade, status_, id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ mensagem: "Erro ao atualizar chamado.", erro: erro.message });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Chamado não encontrado." });
    }
    res.json({
      mensagem: "Chamado atualizado com sucesso.",
      chamado: { id, titulo, descricao, setor_solicitante, prioridade, status_ }
    });
  });
});

// 4. DELETE
app.delete("/chamados/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM chamados WHERE id = ?";

  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ mensagem: "Erro ao remover chamado.", erro: erro.message });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Chamado não encontrado." });
    }
    res.json({ mensagem: "Chamado removido com sucesso." });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});