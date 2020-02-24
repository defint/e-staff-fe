export interface IStatItem {
  title: string;
  total: number;
}

export interface IStat {
  total: number;
  offices: IStatItem[];
  tags: IStatItem[];
}
