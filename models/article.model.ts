import {Schema, model, models, Document} from 'mongoose'

export interface IArticle extends Document {
    title: string;
    desc: string;
    description: string;
    image: string;
    tags: Schema.Types.ObjectId[];
    createdAt: Date;
}
const ArticleSchema = new Schema({
    title: {type:String, required: true},
    desc: {type:String, required: true},
    description: {type:String, required: true},
    image: {type:String, required: true},
    tags: [{type:Schema.Types.ObjectId, ref: "Tag"}],
    createdAt: {type:Date, default: Date.now},
})
const Article = models.Article || model('Article', ArticleSchema)
export default Article
