"use server";
import { Notice } from "@/models/notice.model";
import { connectToDatabase } from "@/lib/mongoose";

import {
  DeleteNoticeParams,
  GetNoticeByIdParams,
  RemoveVoteParams,
  UpdateNoticeParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";

export async function getNoticeById(params: GetNoticeByIdParams) {
  try {
    await connectToDatabase();
    const { ownerId } = params;
    const notice = await Notice.findById(ownerId);
    return notice;
  } catch (e) {
    console.log("error z pobierania ogłoszenia", e);
    throw e;
  }
}

export async function updateNotice(params: UpdateNoticeParams) {
  try {
    await connectToDatabase();
    const { ownerId, updateData, path } = params;
    await Notice.findOneAndUpdate({ ownerId }, { updateData }, { new: true });
    revalidatePath(path);
    console.log("dane z update ogłoszenia", ownerId, updateData, path);
  } catch (e) {
    console.log("error z updatowania ogłoszenia", e);
    throw e;
  }
}

export async function deleteNotice(params: DeleteNoticeParams) {
  try {
    await connectToDatabase();
    console.log(params, "params to delete");
    const notice = await Notice.findOne({ _id: params });
    console.log("kasujemy ogłoszenie", notice);
    if (!notice) {
      throw new Error("Ogłoszenie o takim id nie zostało znalezione");
    }
    // kasowanie ogłoszenia
    const deletedNotice = await Notice.findByIdAndDelete({ _id: params });
    console.log("ogłoszenie usunieto", deletedNotice);
    return deletedNotice;
  } catch (e) {
    console.log("error z usuwania ogłoszenia", e);
    throw e;
  }
}

export async function removeVote(params: RemoveVoteParams) {
  try {
    await connectToDatabase();
    const { noticeId, userId } = params;
    // Usuwanie głosu użytkownika
    const updatedNotice = await Notice.findByIdAndUpdate(
      noticeId,
      { $pull: { votes: { userId } } },
      { new: true },
    );
    if (!updatedNotice) {
      throw new Error("Ogłoszenie nie zostało znalezione");
    }
    console.log("Głos usunięty", updatedNotice);
    return updatedNotice;
  } catch (e) {
    console.log("Błąd przy usuwaniu głosu", e);
    throw e;
  }
}
