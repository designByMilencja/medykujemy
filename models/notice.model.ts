import { Schema, model, models, Document } from "mongoose";

export interface IVote extends Document {
  userId: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface INotice extends Document {
  ownerId: Schema.Types.ObjectId;
  votes: IVote[];
}

const voteSchema = new Schema<IVote>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});
export const NoticeSchema = new Schema<INotice>({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votes: [voteSchema],
});

const Notice = models.Notice || model<INotice>("Notice", NoticeSchema);
export { Notice };
