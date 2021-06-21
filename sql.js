const { Client } = require("pg");
require('dotenv/config');

const ELEFHANT_BD_URL = 
process.env.ELEFHANT_BD_URL;

const select = async () => {
    const client = new Client(ELEFHANT_BD_URL);
    const sql = `select idregistro, origem, to_char( datahorario, 'DD-MM-YYYY HH24:MI:SS') as "datahorario" from tbregistro`;
    try {
        await client.connect();
        const { rows } = await client.query(sql);
        await client.end();
        return { rows };
    } catch (e) {
        await client.end();
        console.log(e);
        return { error: e.message };
    }
};

const insert = async (origem) => {
    if (origem === undefined || origem.trim() === "") {
        return { error: "Forneça a origem" };
    }
    const client = new Client(ELEFHANT_BD_URL);
    const sql = `insert into tbregistro(origem) values ('${origem}')`;
    try {
        await client.connect();
        const { rowCount } = await client.query(sql);
        await client.end();
        return { rowCount };
    } catch (e) {
        await client.end();
        return { error: e.message };
    }
};

const del = async (idregistro) => {
    if (idregistro === undefined) {
        return { error: 'ID is undefined' };
    }
    idregistro = idregistro.replace(/[^0-9]/g, '')
    if (idregistro === '') {
        return { error: 'ID not valid' };
    }
    const client = new Client(ELEFHANT_BD_URL);
    const sql = `delete from tbregistro where idregistro = ${idregistro}`;
    try {
        await client.connect();
        const { rowCount } = await client.query(sql);
        await client.end();
        return { rowCount };
    } catch (e) {
        await client.end();
        return { error: e.message };
    }
};

module.exports = {
    select,
    insert,
    del,
  };