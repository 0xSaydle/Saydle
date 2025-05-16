import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  dob?: Date;
  address: string;
  profilePicture: string;
  gender: "male" | "female" | "other";
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false },
    dob: { type: Date },
    address: { type: String, required: false },
    gender: { type: String, enum: ["male", "female", "other"], required: false },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);


// Check if model exists to prevent overwrite error
const UserDoc = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserDoc;
