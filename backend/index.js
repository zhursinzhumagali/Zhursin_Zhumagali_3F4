import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, password]
    );

    res.json({
        message: "User registered"
    });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        [username, password]
    );

    if (result.rows.length > 0) {
        res.json({
            message: "Login successful"
        });
    } else {
        res.status(400).json({
            message: "Invalid username or password"
        });
    }
});

app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    await pool.query(
        "UPDATE users SET username = $1 WHERE id = $2",
        [username, id]
    );

    res.json({
        message: "Username updated"
    });
});

app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    await pool.query(
        "DELETE FROM users WHERE id = $1",
        [id]
    );

    res.json({
        message: "User deleted"
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});