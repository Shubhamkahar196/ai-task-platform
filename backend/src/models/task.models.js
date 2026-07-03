import mongoose,{Schema} from 'mongoose';

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    inputText:{
        type:String,
        trim:true,
        required:true,
    },
    operation: {
        type:String,
        enum: ["upercase","lowercase","reverse","wordcount"],
        required:true,
    },
    status: {
        type:String,
        enum: ["Pending","Running","Success","Failed"],
        default: "Pending"
    },
    result: {
        type:String,
        status:{
            enum: ["Pending","Running","Success","Failed"],
        }
    },
    log:{
        type:String,
       enum: ["Pending","Running","Success","Failed"],
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps:true})

const Task = mongoose.model("Task",taskSchema);
export default Task;