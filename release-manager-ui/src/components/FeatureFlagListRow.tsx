import React from "react";
import { Column, FeatureFlagLog } from "../pages/FeatureFlagLogList";

type FeatureFlagListRowProps = {
  row: FeatureFlagLog;
  columns: Column[];
};
export function FeatureFlagListRow({
  row,
  columns,
}: FeatureFlagListRowProps): JSX.Element {
  return <div>FeatureFlagLogList</div>;
}
