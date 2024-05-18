import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
  licenceNumber?: string;
  companyName?: string;
  city: string;
  occupation: string;
  specialization: string;
  experience: string;
  hours: string;
  contractType: string;
  additional: string;
  responsibilities: string;
  requirements: string;
  brandLink: string;
  votesCast: string;
  votesReceived: string;
  accept: boolean;
}

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

export const UserSchema = new Schema<IUser>(
  {
    id: String,
    name: { type: String, max: 100 },
    surname: { type: String, max: 100 },
    email: { type: String, unique: true, max: 100 },
    password: String,
    role: String,
    isVerified: Boolean,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    city: String,
    occupation: String,
    specialization: String,
    hours: String,
    contractType: String,
    additional: String,
    responsibilities: String,
    requirements: String,
    experience: String,
    brandLink: String,
    votesCast: String,
    votesReceived: String,
    accept: Boolean,
    licenceNumber: {
      type: String,
      required: function (this: IUser) {
        return this.role === "employee";
      },
    },
    companyName: {
      type: String,
      required: function (this: IUser) {
        return this.role === "employer";
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export { User };
