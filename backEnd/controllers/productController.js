const pdtM = require('../models/pdtModel');
const catM = require('../models/catModel');


const showProduct = async (req, res) => {
    var ans_count = await pdtM.countDocuments();
    var ans_product = await pdtM.aggregate([
        {
            "$lookup": {
                "let": { "catid": { "$toObjectId": "$catid" } },
                "from": "categories",
                "pipeline": [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$catid"] } } }
                ],
                "as": "catvalues"
            }
        },
        { "$skip": 0 },
        { "$limit": 10 }
    ]);

    console.log(ans_product);
    console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
}

const insertProduct = async (req, res) => {
    console.log(req.body); // {name:'Mens'}
    //insert
    const instance = new pdtM(req.body);
    const ans_insert = await instance.save();
    // console.log("After Insert");
    // console.log(ans_insert);
    // res.send({msg:"PRODUCT POST ROUTE CALLED"});
    res.send({ msg: "PRODUCT Added" });
}

const selectProductById = async (req, res) => {
    var ans_product_by_id = await pdtM.findById(req.params.id);
    var ans_cat = await catM.find();
    res.send({
        catRecord: ans_cat,
        productRec: ans_product_by_id
    });
}

const updateProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.params);

    var ans_product = await pdtM.findByIdAndUpdate(req.params.productid, req.body);
    res.send({ msg: true })
}

const deleteProduct = async (req, res) => {
    console.log(req.params); // 

    // res.send({msg:"Route Called"});
    // console.log(req.params);

    var ans_product = await pdtM.findByIdAndRemove(req.params.productid);
    console.log(ans_product);
    res.send({ msg: true })
}

module.exports = {
    showProduct,
    insertProduct,
    updateProduct,
    selectProductById,
    deleteProduct
}