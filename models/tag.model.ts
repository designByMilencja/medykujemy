import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  articles: Schema.Types.ObjectId[];
  createdOn: Date;
}
const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  createdOn: { type: Date, default: Date.now() },
});
const Tag = models.Tag || model("Tag", TagSchema);
export default Tag;
