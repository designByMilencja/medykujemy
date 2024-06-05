"use server";
import { connectToDatabase } from "@/lib/mongoose";
import Event from "@/models/event.model";
import {
  CreateEventParams,
  EditEventParams,
  GetEventByIdParams,
  GetEventsParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";

export async function getEvents(params: GetEventsParams) {
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ createdAt: -1 });
    return { events };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createEvent(params: CreateEventParams) {
  try {
    await connectToDatabase();
    const { title, desc, src, time, location, date, path } = params;

    // create the article
    const event = await Event.create({
      title,
      desc,
      src,
      time,
      location,
      date,
    });

    await Event.findByIdAndUpdate(event._id, {});
    revalidatePath(path);
  } catch (e) {
    console.log("error in create event", e);
  }
}

export async function editEvent(params: EditEventParams) {
  try {
    await connectToDatabase();
    const { title, src, time, location, date, desc, eventId, path } = params;
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Nie znaleziono wydarzenia");
    }
    event.title = title;
    event.desc = desc;
    event.time = time;
    event.src = src;
    event.date = date;
    event.location = location;
    await event.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEventById(params: GetEventByIdParams) {
  try {
    console.log(params);
    await connectToDatabase();
    const { eventId } = params;
    const event = await Event.findById(eventId);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
