export interface FeatureFlag {
  platform: string;
  value: string | boolean | object | number;
  name: string;
  geo: string;
  sampling: number;
  changedBy: string;
  changedAt: Date;
  changedAtString: string;
}

export interface FeatureFlagState {
  featureFlags: FeatureFlag[];
  filters: TableFilters;
  platformList: string[];
  variableList: string[];
  geoList: string[];
  userList: string[];
}

export type TableFilters = {
  search: string;
  userFilter: string;
  variableFilter: string;
  geoFilter: string;
  platformFilter: string;
  fromDate?: Date;
  toDate?: Date;
};
