const express = require("express")
const app = express()
const mongoose = require('mongoose');

// mongoose.connect('mongodb://172.21.2.236:27017/190110910539');
// const schema = {
//     name: String,
//     age: Number,
//     health: String,
//     hobby: String
// }
// const Cat = mongoose.model('cat1', schema);
// const kitty = new Cat({ name: 'testZildjian' });
// kitty.save().then(() => console.log('meow!'));

app.use('/',express.static('public'))
app.get("/input", (req, res) => {
    res.send(req.query)
    console.log(req.query)
})
app.listen(10539)
