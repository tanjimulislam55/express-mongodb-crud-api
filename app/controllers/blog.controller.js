const db = require("../models")
const Blog = db.blogs

exports.create = async (req, res) => {
    if (!req.body.title) return res.status(400).send({ message: "Content is required"})
    // initial blog instance
    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        paragraphs: req.body.paragraphs.map((paragraph) => ({ createdAt: new Date(), ...paragraph}))
    })
    // save to db
    const data = await newBlog.save(newBlog)
    if (data) return res.send(data)
    // else return res.status(500).send({ message: data.message })
}

exports.updateToPush = async (req, res) => {
    const id = req.params.id
    await Blog.findByIdAndUpdate(
        { _id: id }, 
        { 
            $push: { paragraphs: {
                
                $each: [ req.body.paragraph],
                $position: req.body.paragraph.serial
            } }, 
        },
    )
    return res.send({ message: "Blog was updated successfully." })

//     const id = req.params.id
//     // search specific blog with id 
//     const data = await Blog.findById(id)
//     if (!data) return res.status(404).send({ message: `Not found blog with id = ${id}`})
//     // check valid array of objects
//     if (!req.body.paragraphs.length >= 1 || Object.keys(req.body).length !== 1) {
//         return res.status(400).send({
//             message: "Data to update can not be empty! Or it should be an array"
//         })
//     }
//     else {
//         const blog = await Blog.findById(id)
//         const existingParagraphs = blog.paragraphs
//         // individually push each paragraph
//         for (paragraph of req.body.paragraphs) {
//             // check whether serial number does match or not
//             const isMatchedSerialNumber = existingParagraphs.some(eachExistingParagraph => {
//                 eachExistingParagraph.serial === paragraph.serial
//             })
//             // apply update rest of the paragraph's serial number addition by one
//             if (isMatchedSerialNumber) {
//                 await Blog.updateOne(
//                     { _id: id, paragraphs: { $elemMatch: { "serial": { $gte: paragraph.serial } } } },
//                     { $inc: { "paragraphs.$[].serial": 1 }}
//                 )
//             }
//             // push along with existing paragraphs
//             paragraph.createdAt = new Date()
//             const updatedBlog = await Blog.findByIdAndUpdate(
//                 { _id: id }, 
//                 { 
//                     $push: { paragraphs: paragraph }, 
//                 },
//             )
//             if (!updatedBlog) return res.status(404).send({ message: `Cannot update blog with id = ${id}` })
//         }  
//         return res.send({ message: "Blog was updated successfully." })
//     }
}


exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    data = await Blog.find(condition)
    if (data) return res.send(data)
    // else return res.status(500).send({ message: data.message })
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
            .send({ message: "Error retrieving Blog with id = " + id });
        });
  };
  
  
exports.delete = async (req, res) => {
    const id = req.params.id;
    await Blog.updateOne({ _id: id }, { $pull: { paragraphs: { description: "two"}} })
    return res.send({ message: "Blog was deleted successfully." })
    // Blog.findByIdAndRemove(id, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
    //             });
    //         } else {
    //             res.send({
    //                 message: "Blog was deleted successfully!"
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //         message: "Could not delete Blog with id=" + id
    //     });
          
    //   });
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
  