import { Typography } from "@mui/material";

import { localeDate } from "modules/helpers/dates";
import StatusLabel from "modules/common/statuses/StatusLabel";

import Options from "../buttons/Options";

import { CellCopy } from "./CellCopy";
import { CellActions } from "./CellActions";
import CellSim from "./CellSim";
import CellSimStatus from "./CellSimStatus";
import QodCell from "./QodCell";

export const renderCell = (value, params) => (
  <Typography data-testid={params.columnData.label} variant="body2">
    {value}
  </Typography>
);

export const renderCopyCell = (value, params) => (
  <CellCopy data-testid={params.columnData.label} value={value} variant="body1" />
);

export const renderReservationCountCell = (value, params) => (
  <Typography data-testid={params.columnData.label} variant="body1">
    {value === 0 ? "0" : value || "-"}
  </Typography>
);

export const renderDateCell = (value, params) => (
  <Typography data-testid={params.columnData.label} variant="body2">
    {value && localeDate(value, params.columnData.language)}
  </Typography>
);

export const renderOidCell = (value) => (
  <CellCopy data-testid="operator-oid" value={value || "-"} variant="body1" />
);

export const renderActionsCell = (options) => <CellActions {...options} />;

export const renderLabelCell = (value) => <StatusLabel status={value} />;

export const renderSimCell = (values) => <CellSim {...values} />;

export const renderSimCellStatus = (values) => <CellSimStatus {...values} />;

export const renderOptionCell = (options) => <Options options={options} />;

export const renderQodCell = (value, params) => (
  <QodCell
    data-testid={params.columnData.label}
    onChange={params.onChange}
    value={value}
    variant="body2"
  />
);

export { QodCell };
