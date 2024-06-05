import { Schema, model, models, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  desc: string;
  src: string;
  time: string;
  location: string;
  date: string;
}
const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  src: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
});
const Event = models.Event || model("Event", EventSchema);
export default Event;
