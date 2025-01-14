import { IUser } from "@/models/user.model";
import { INotice } from "@/models/notice.model";
// artykuły

export interface CreateArticleParams {
  title: string;
  desc: string;
  description: string;
  image: string;
  tags: string[];
  path: string;
}

export interface EditArticleParams {
  articleId?: string;
  title: string;
  desc: string;
  description: string;
  image: string;
  path: string;
}

export interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetArticleByIdParams {
  articleId: string;
}

// pracodawca
export interface EditEmployerParams {
  userId?: string;
  companyName: string;
  brandLink: string;
  city: string;
  occupation: string;
  specialization: string;
  responsibilities: string;
  requirements: string;
  salary: string;
  contractType: string;
  hours: string;
  role: string;
  accept: boolean;
  additional: string | undefined | null;
  path: string;
}

// pracownik
export interface EditEmployeeParams {
  userId?: string;
  city: string;
  occupation: string;
  specialization: string;
  experience: string;
  contractType: string;
  hours: string;
  additional: string | undefined | null;
  role: string;
  accept: boolean;
  path: string;
}

// user

export interface UpdateUserParams {
  id: string;
  updateData: Partial<IUser>;
  path: string;
}
export interface DeleteUserParams {
  id: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface GetUserByIdParams {
  userId: string;
}

// procedury
export interface CreateProcedureParams {
  title: string;
  desc: string;
  description: string;
  image: string;
  video: string;
  sources: string[];
  path: string;
}

export interface EditProcedureParams {
  procedureId?: string;
  title: string;
  desc: string;
  description: string;
  image: string;
  video: string;
  path: string;
}
export interface GetProceduresParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetProcedureByIdParams {
  procedureId: string;
}

// ogłoszenie

export interface UpdateNoticeParams {
  noticeId: string;
  updateData: Partial<INotice>;
  path: string;
}

export interface GetNoticeByIdParams {
  noticeId: string;
}

export interface DeleteNoticeParams {
  noticeId: string;
}

export interface RemoveVoteParams {
  noticeId: string;
  userId: string;
}

// eventy

export interface CreateEventParams {
  title: string;
  desc: string;
  location: string;
  time: string;
  src: string;
  date: string;
  path: string;
}

export interface EditEventParams {
  eventId?: string;
  title: string;
  desc: string;
  location: string;
  time: string;
  src: string;
  date: string;
  path: string;
}

export interface GetEventsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetEventByIdParams {
  eventId: string;
}
