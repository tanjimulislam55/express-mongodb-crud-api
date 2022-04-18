module.exports = app => {
    const blogs = require("../controllers/blog.controller.js")

    const router = require("express").Router()

    router.post("/", blogs.create)

    router.put("/:id", blogs.updateToPush)

    router.get("/", blogs.findAll);

    router.get("/:id", blogs.findOne);

    // router.put("/:id", blogs.update);

    router.delete("/:id", blogs.delete);

    router.delete("/", blogs.deleteAll);

    app.use("/api/blogs", router);
}