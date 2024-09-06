import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../../types/types";

const deviseSchema = new Schema<IUser>({
    deviseId: { type: String, required: true },
    initDate: { type: Number, required: true },
});

const Device: Model<IUser> = mongoose.models.Device || mongoose.model<IUser>("Device", deviseSchema);

export default Device;
