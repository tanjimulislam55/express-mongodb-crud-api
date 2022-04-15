const express = require("express")
const cors = require("cors")

const app = express()

const corsOptions = {
    origin: [
        "http://localhost:3000", 
        "https://localhost:3000"
    ]
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models")
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to the db")
}).catch((err) => {
    console.log("cannot connect to db.", err)
    process.exit()
})

app.get("/", (req, res) => {
    res.json({
        message: "welcome to app"
    })
})

require("./app/routes/blog.route.js")(app)

const Port = 8000
app.listen(Port, () => {
    console.log("Server is running on port", Port);
})