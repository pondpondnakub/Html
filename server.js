const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const DATA_FILE = "data.json";

function loadData() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    } catch (e) {
        return [];
    }
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// CREATE
app.post("/register", (req, res) => {
    let data = loadData();
    let newId = data.length ? data[data.length - 1].id + 1 : 1;

    const newData = {
        id: newId,
        ...req.body
    };

    data.push(newData);
    saveData(data);

    res.json({ status: "ok", message: "ลงทะเบียนสำเร็จ!" });
});

// READ
app.get("/get-data", (req, res) => {
    res.json(loadData());
});

// UPDATE
app.put("/update/:id", (req, res) => {
    let data = loadData();
    const id = Number(req.params.id);

    const idx = data.findIndex(x => x.id === id);
    if (idx === -1) return res.json({ status: "error", message: "ไม่พบข้อมูล" });

    data[idx] = { id, ...req.body };
    saveData(data);

    res.json({ status: "ok", message: "แก้ไขสำเร็จ" });
});

// DELETE
app.delete("/delete/:id", (req, res) => {
    let data = loadData();
    const id = Number(req.params.id);

    data = data.filter(item => item.id !== id);
    saveData(data);

    res.json({ status: "ok", message: "ลบสำเร็จ" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
