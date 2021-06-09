const Category = require('../models/Category')

exports.create = async(req, res) => {
    const category = new Category(req.body)
    await category.save()
    res.json({ status: "Category Saved" })
}

 
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            console.error(err)
        }
        res.json(data)
    })
}
 exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, data) => {
        if(err) {
            console.error(err)
            res.json({ status: "Algo salio mal"})
        }
        res.json({ status: "Se removio exitosamente"})
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            console.error(err)
            res.json({status:"Algo salio mal o no existe"})

        }
        req.category = category
        next()
    })
}