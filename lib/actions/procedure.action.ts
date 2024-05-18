"use server";
import { connectToDatabase } from "@/lib/mongoose";
import Procedure from "@/models/procedure.model";
import {
  CreateProcedureParams,
  EditProcedureParams,
  GetProcedureByIdParams,
  GetProceduresParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";
import Source from "@/models/source.model";

export async function getProcedures(params: GetProceduresParams) {
  try {
    await connectToDatabase();
    const procedures = await Procedure.find({})
      .populate({ path: "sources", model: Source })
      .sort({ createdAt: -1 });
    return { procedures };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createProcedure(params: CreateProcedureParams) {
  try {
    await connectToDatabase();
    const { title, desc, video, description, image, sources, path } = params;
    console.log(
      "dane z tworzenia procedury",
      title,
      description,
      image,
      sources,
      desc,
      video,
      path,
    );

    // create the procedure
    const procedure = await Procedure.create({
      title,
      description,
      image,
      desc,
      video,
    });
    const sourceDocuments = [];
    // create the tags or get them if they already exist
    for (const source of sources) {
      const existingSource = await Source.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${source}$`, "i") },
        },
        {
          $setOnInsert: {
            name: source,
          },
          $push: {
            procedures: procedure._id,
          },
        },
        { upsert: true, new: true },
      );
      sourceDocuments.push(existingSource._id);
    }
    await Procedure.findByIdAndUpdate(procedure._id, {
      $push: {
        sources: { $each: sourceDocuments },
      },
    });
    revalidatePath(path);
  } catch (e) {
    console.log("error in create article");
  }
}

export async function editProcedure(params: EditProcedureParams) {
  try {
    await connectToDatabase();
    const { title, image, description, desc, video, procedureId, path } =
      params;
    const procedure = await Procedure.findById(procedureId).populate("sources");

    if (!procedure) {
      throw new Error("Nie znaleziono procedury");
    }
    procedure.title = title;
    procedure.image = image;
    procedure.description = description;
    procedure.desc = desc;
    procedure.video = video;
    await procedure.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProcedureById(params: GetProcedureByIdParams) {
  try {
    await connectToDatabase();
    const { procedureId } = params;
    const procedure = await Procedure.findById(procedureId).populate({
      path: "sources",
      model: Source,
      select: "_id name",
    });
    return procedure;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
