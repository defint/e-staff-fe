import { Component, OnInit } from "@angular/core";

export interface IOffice {
  id: number;
  title: string;
}

export interface ITag {
  id: number;
  label: string;
}

export interface IEmployee {
  id: number;
  name: string;
  age: number;
  phone: string;
  office: IOffice;
  tags: ITag[];
}

const ELEMENT_DATA: IEmployee[] = [
  {
    id: 1,
    name: "name4",
    age: 33,
    phone: "+38096554433",
    office: {
      id: 1,
      title: "Tallinn"
    },
    tags: [
      {
        id: 2,
        label: "tag2"
      }
    ]
  },
  {
    id: 2,
    name: "name555",
    age: 28,
    phone: "65757567",
    office: {
      id: 2,
      title: "Riga"
    },
    tags: [
      {
        id: 2,
        label: "tag2"
      },
      {
        id: 1,
        label: "tag1"
      }
    ]
  }
];

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ["name", "age", "phone", "office", "tags"];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
