require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const users = JSON.parse(process.env.USERS);

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "請提供使用者名稱和密碼"});
    }
    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    if (user) {
        res.json({
            success: true,
            user: { id: user.id, username: user.username },
        });
    } else {
        res.status(401).json({ sucess: false, message: "使用者名稱或密碼錯誤" })
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
