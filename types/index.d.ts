export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Reset {
  email: string;
}

export interface LoginData extends Reset {
  password: string;
}

export interface UserRegister extends LoginData {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  salary: string;
  isVerified: boolean;
  companyName?: string;
  licenceNumber?: string;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: string;
  verifyToken: string;
  verifyTokenExpiry: string;
  city?: string;
  occupation?: string;
  specialization?: string;
  experience?: string;
  hours?: string;
  contractType?: string;
  additional?: string;
  responsibilities?: string;
  requirements?: string;
  brandLink?: string;
  accept: false;
}

export interface ParamsProps {
  params: { id: string };
}

export interface JobProps {
  userDetails?: string;
  type: "add" | "edit";
}
