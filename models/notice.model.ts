import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IVote extends Document {
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface INotice extends Document {
  ownerId: mongoose.Types.ObjectId;
  votes: IVote[];
}

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const voteSchema = new mongoose.Schema<IVote>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});
export const NoticeSchema = new Schema<INotice>({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votes: [voteSchema],
});

const Notice =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);
export { Notice };
