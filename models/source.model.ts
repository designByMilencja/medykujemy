import {Schema, model, models, Document} from 'mongoose'

export interface ISource extends Document {
    name: string;
    procedures: Schema.Types.ObjectId[];
    createdOn: Date;
}
const SourceSchema = new Schema({
    name: {type:String, required: true, unique: true},
    procedures: [{type: Schema.Types.ObjectId, ref: 'Procedure'}],
    createdOn: {type: Date, default: Date.now()}
})
const Source = models.Source || model('Source', SourceSchema)
export default Source;
