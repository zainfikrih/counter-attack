const { default: axios } = require("axios");
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Counterattack to Telegram Bot"));

app.get("/counterattack", (req, res) => {
    let token = req.query.token
    let chatId = req.query.chatId
    let message = req.query.bacotan
    let limit = req.query.limit ?? 10

    let success = [];
    let error = [];
    let promises = [];
    for (i = 0; i < limit; i++) {
        promises.push(
            axios.post(
                `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`
            ).then((resB) => { success.push(resB.data) }).catch(e => { error.push(e) })
        )
    }

    Promise.all(promises).then(() => {
        console.log(`Success: ${success}`)
        console.log(`Error: ${error}`)
        res.json({ success: success.length, error: error.length, data: success })
    });

});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;