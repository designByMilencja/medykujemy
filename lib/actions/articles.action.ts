"use server"
import {connectToDatabase} from "@/lib/mongoose";
import Article from "@/models/article.model";
import Tag from "@/models/tag.model";

import {
    CreateArticleParams,
    EditArticleParams,
    GetArticleByIdParams,
    GetArticlesParams
} from "@/lib/actions/shared.types";
import {revalidatePath} from "next/cache";

export async function getArticles(params: GetArticlesParams) {
    try {
        connectToDatabase();
        const articles = await Article.find({})
            .populate({path: 'tags', model: Tag})
            .sort({createdAt: -1})
        return {articles}
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

export async function createArticle(params: CreateArticleParams) {
    try {
        await connectToDatabase()
        const {title, description, desc, image, tags, path} = params;

        // create the article
        const article = await Article.create({
            title, description, image, desc,
        });
        const tagDocuments = []
        // create the tags or get them if they already exist
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                {
                    name: {$regex: new RegExp(`^${tag}$`, "i")},
                },
                {
                    $setOnInsert: {
                        name: tag,
                    },
                    $push: {
                        articles: article._id,
                    },
                },
                {upsert: true, new: true},
            );
            tagDocuments.push(existingTag._id);
        }
        await Article.findByIdAndUpdate(article._id, {
            $push: {
                tags: {$each: tagDocuments},
            },
        });
        revalidatePath(path)
    } catch (e) {
        console.log('error in create article')
    }
}

export async function editArticle(params: EditArticleParams) {
    try {
        await connectToDatabase();
        const { title, image, description,desc, articleId, path } = params;
        const article = await Article.findById(articleId).populate("tags");

        if (!article) {
            throw new Error("Nie znaleziono artykułu");
        }
        article.title = title;
        article.image = image;
        article.desc = desc;
        article.description = description;
        await article.save();

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getArticleById(params: GetArticleByIdParams) {
    try {
        console.log(params)
        await connectToDatabase();
        const { articleId } = params;
        const article = await Article.findById(articleId)
            .populate({
                path: "tags",
                model: Tag,
                select: "_id name",
            })
        return article;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
