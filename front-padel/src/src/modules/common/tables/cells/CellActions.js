import { PropTypes } from "prop-types";

import { Tooltip, Grid, IconButton } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useTablesTranslation } from "translations";

export const CellActions = ({ id, handleDelete, handleEdit, handleView }) => {
  const t = useTablesTranslation();

  const onEdit = () => handleEdit(id);
  const onDelete = () => handleDelete(id);
  const onView = () => handleView(id);

  return (
    <Grid
      alignItems="baseline"
      container
      data-testid="table-actions"
      justifyContent="flex-end"
      pr={3}
      spacing={1.5}
    >
      {handleEdit && (
        <Grid item>
          <Tooltip data-testid="edit" title={t("edit")}>
            <IconButton onClick={onEdit} variant="contrast">
              <MuisticaIcon color="text.primary">edit-pencil</MuisticaIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {handleView && (
        <Grid item>
          <Tooltip data-testid="view" title={t("view")}>
            <IconButton onClick={onView} variant="contrast">
              <MuisticaIcon color="text.primary">eye</MuisticaIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {handleDelete && (
        <Grid item>
          <Tooltip data-testid="delete" title={t("delete")}>
            <IconButton onClick={onDelete} variant="contrast">
              <MuisticaIcon color="text.primary">trash-can</MuisticaIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

CellActions.propTypes = {
  id: PropTypes.any,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleView: PropTypes.func,
};
