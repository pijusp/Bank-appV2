const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3003;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.get("/users", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    res.json(allData);
});

app.post("/users", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    const id = uuidv4();
    const data = {
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        balance: req.body.balance,
    };
    allData.push(data);
    allData = JSON.stringify(allData);
    fs.writeFileSync("./data/users.json", allData, "utf8");
    res.json({
        message: { text: "New user is saved", type: "success" },
    });
});
app.delete("/users/:id", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    console.log(req.params.id);
    let deletedData = allData.filter((d) => req.params.id !== d.id);
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync("./data/users.json", deletedData, "utf8");
    res.json({ message: { text: "The user was deleted", type: "danger" } });
});
app.put("/numbers/:action/:id", (req, res) => {
    let allData = fs.readFileSync("./data/numbers.json", "utf8");
    allData = JSON.parse(allData);
    let editedData;
    if (req.params.action == "add") {
        editedData = allData.map((d) =>
            req.params.id === d.id
                ? { ...d, number: d.number + req.body.number }
                : { ...d }
        );
    } else if (req.params.action == "rem") {
        editedData = allData.map((d) =>
            req.params.id === d.id
                ? { ...d, number: d.number - req.body.number }
                : { ...d }
        );
    }
    editedData = JSON.stringify(editedData);
    fs.writeFileSync("./data/numbers.json", editedData, "utf8");

    res.json({ message: { text: "Number was edited", type: "info" } });
});

app.listen(3003, () => {
    console.log(`Server running on port ${port}`);
});
