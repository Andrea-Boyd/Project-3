const subGroupSchema = new Schema({
    name: { type: String, required: true },

})

const SubGroup = mongoose.model("subgroup", subGroupSchema);

module.exports = SubGroup;

