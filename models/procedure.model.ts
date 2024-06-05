import { Schema, model, models, Document } from "mongoose";

export interface IProcedure extends Document {
  title: string;
  desc: string;
  description: string;
  image: string;
  video: string;
  sources: Schema.Types.ObjectId[];
  createdAt: Date;
}
const ProcedureSchema = new Schema<IProcedure>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  sources: [{ type: Schema.Types.ObjectId, ref: "Source" }],
  createdAt: { type: Date, default: Date.now },
});
const Procedure = models.Procedure || model("Procedure", ProcedureSchema);
export default Procedure;
