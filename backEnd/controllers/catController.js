const catM = require('../models/catModel');

const showCategory = async (req, res) => {
    var ans_cat = await catM.find();
    res.send(ans_cat);
}

const insertCategory = async (req, res) => {
    console.log(req.body); // {name:'Mens'}
    //insert
    const instance = new catM(req.body);
    const ans_insert = await instance.save();
    console.log("After Insert");
    console.log(ans_insert);
    res.send({ msg: "CATEGORY POST ROUTE CALLED" });
}

const selectCategoryById = async (req, res) => {
    var ans_cat = await catM.findById(req.params.id);
    res.send(ans_cat);
}

const updateCategory = async (req, res) => {
    console.log(req.body);
    console.log(req.params);

    // res.send({msg:"ROUTE CALLED"});

    var ans_product = await catM.findByIdAndUpdate(req.params.categoryid, req.body);
    console.log(ans_product);
    res.send({ msg: true })
}

const deleteCategory = async (req, res) => {
    // console.log(req.params); // 

    // res.send({msg:"Route Called"});
    console.log(req.params);

    var ans_cat = await catM.findByIdAndRemove(req.params.myid);
    // console.log(ans_cat);
    res.send({ msg: true })
}
module.exports = {
    showCategory,
    insertCategory,
    updateCategory,
    selectCategoryById,
    deleteCategory
}