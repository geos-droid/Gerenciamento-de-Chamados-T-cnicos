const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "suporte_db"
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao banco.");
        return;
    }

    console.log("Banco de dados conectado com sucesso.");
});

module.exports = conexao;