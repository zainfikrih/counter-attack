const { default: axios } = require("axios");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    let token = req.query.token
    let chatId = req.query.chatId
    let message = req.query.bacotan
    let limit = req.query.limit ?? 50

    if (!token || !chatId || !message) {
        return res.send("Counterattack to Telegram Bot\n\nQuery\ntoken: token bot telegram\nchatId: chat id bot telegram\nbacotan: bacotanmu\nlimit: banyak bacotanmu (default: 50)\n\nExample request: https://counterattack.vercel.app/counterattack?token=7182200110:AAFHsca6yqtpxU3RKSGl78AgJBjX1lzbCog&chatId=6343087886&bacotan=Tobat...")
    }

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

    let result = {}
    Promise.all(promises).then(() => {
        console.log(`Success: ${success}`)
        console.log(`Error: ${error}`)
        result = res.json({ success: success.length, error: error.length, data: success })
    });

    return result
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;