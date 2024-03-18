import * as mongoose from "mongoose";

interface User extends Document {
    username: string;
    password: string;
}

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model<User>('User', UserSchema)