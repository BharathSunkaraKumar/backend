const mongoose = require("mongoose")

const unicornSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    loves: [String],
    weight: Number,
    vampires: Number,
    gender: String,
});

const unicornModel = new mongoose.model("unicorn", unicornSchema);

module.exports = unicornModel;