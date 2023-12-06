import { Release } from "../release/models";

export interface Version {
  projectName: string;
  version: string;
  createdBy: string;
  description: string;
  createdAt: Date;
  createdAtString: string;
  releases: Release[];
}

export type TableFilters = {
  search: string;
  userFilter: string;
  projectFilter: string;
  fromDate?: Date;
  toDate?: Date;
};

export interface VersionState {
  versions: Version[];
  filters: TableFilters;
  projectList: string[];
  userList: string[];
}
