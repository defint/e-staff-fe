import { IOffice } from "./office";
import { ITag } from "./tag";

export interface IEmployee {
  id: number;
  name: string;
  age: number;
  phone: string;
  office: IOffice;
  tags: ITag[];
}
