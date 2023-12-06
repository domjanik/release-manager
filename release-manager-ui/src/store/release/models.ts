export interface ReleaseState {
  releases: Release[];
  filters: TableFilters;
  platformList: string[];
  projectList: string[];
  geoList: string[];
  userList: string[];
}
export interface Release {
  projectName: string;
  version: string;
  geo: string;
  publishedBy: string;
  platform: string;
  publishedAt: Date;
  publishedAtString: string;
  description?: string;
}

export type TableFilters = {
  search: string;
  userFilter: string;
  projectFilter: string;
  geoFilter: string;
  platformFilter: string;
  fromDate?: Date;
  toDate?: Date;
};
