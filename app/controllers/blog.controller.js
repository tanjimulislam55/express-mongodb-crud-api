const db = require("../models")
const Blog = db.blogs

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "content required"})
        return
    }

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        paragraphs: req.body.paragraphs
    })
    blog.save(blog).then((data) => res.send(data)).catch((err) => {
        res.status(500).send({ message: err.message })
    })
}


exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Blog.find(condition)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({ message: err.message})
      })
  };
  
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Blog.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Blog with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving Blog with id=" + id });
        });
  };
  
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Cannot update Blog with id=${id}. Maybe Blog was not found!`
        });
        } else res.send({ message: "Blog was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating Blog with id=" + id
        });
    });
  };
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Blog.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
                });
            } else {
                res.send({
                    message: "Blog was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Blog with id=" + id
        });
          
      });
  };
  
exports.deleteAll = (req, res) => {
    Blog.deleteMany({})
    .then(data => {
        res.send({
        message: `${data.deletedCount} Blogs were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message
        });
    });
};
  