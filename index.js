const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/data", async (req, res) => {
    try {
        let { Category, limit } = req.query
        let url = process.env.API_URL;
        if (Category) {
            url = url.concat(`?Category=${Category}`)
        }
        console.log(url);
        let data = await fetch(url, {
            method: "GET"
        })
        data = await data.json();
        if (!data.entries.length) {
            return res.status(404).json({ status: false, msg: "data not found" })
        }
        if (limit) {
            data = data.entries.slice(0, limit);
        }
        return res.status(200).json({ count: data.length, data: data })
    } catch (error) {
        console.log(": error :", error);
        return res.status(500).json({ status: false, msg: "something went wrong" })
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on >_ ${process.env.PORT || 3000}`);
})