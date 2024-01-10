import { Schema, model, mongoose } from "mongoose";
const userSchema = Schema({
    username:{type:String, required:true},
    name: { type: String, required: true },
    email: { type: String, required:true},
    password:{type:String,required:true}
},{
    versionkey:false,
})
const userModel = mongoose.model("user", userSchema);

export default userModel;