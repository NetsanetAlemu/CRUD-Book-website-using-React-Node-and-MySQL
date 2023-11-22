import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bookshop"
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

 app.post("/books", (req, res) => {
    const q = "insert into books (`title`, `description`, `price`, `cover`)values (?)";
    const values = [
        req.body.title, 
        req.body.description, 
        req.body.price,
        req.body.cover
    ];
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been created successfully.");
    })
 })

 app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "delete from books where id = ?"
    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully.")

    })
 })

app.listen(8800, () => {
    console.log(("Connected to backend!"))
})