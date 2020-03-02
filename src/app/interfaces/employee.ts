import { IOffice } from "./office";
import { ITag } from "./tag";

export interface IEmployee {
  id: number;
  name: string;
  dob: string;
  phone: string;
  office: IOffice;
  tags: ITag[];
}
