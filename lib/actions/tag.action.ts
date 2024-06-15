"use server";
import { connectToDatabase } from "@/lib/mongoose";
import Tag from "@/models/tag.model";

export async function getTagIdByName(tagName: string) {
  try {
    await connectToDatabase();
    const tag = await Tag.findOne({ name: tagName.toLowerCase() });
    return tag ? tag._id : null;
  } catch (e) {
    console.log("error z pobierania taga", e);
    throw e;
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();
    const tags = await Tag.find({}, { _id: 1, name: 1 }).limit(10); // Przykład pobierania 10 popularnych tagów
    return tags.map((tag) => ({
      _id: tag._id.toString(),
      name: tag.name,
    }));
  } catch (e) {
    console.log("Error fetching tags", e);
    throw e;
  }
}
