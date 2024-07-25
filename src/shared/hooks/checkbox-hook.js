import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button, Chip, Stack } from "@mui/material";

const CheckboxButtonActions = ({ selectedKeys, handleRemoveIds, noKeys }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ margin: 2 }}>
      <Chip
        label={`${selectedKeys?.length} selected`}
        variant="outlined"
        size="small"
        sx={{ fontSize: 11 }}
      />
      <Chip
        label="Remove"
        icon={<CloseIcon color="error" />}
        clickable
        variant="outlined"
        component={Button}
        size="small"
        disabled={noKeys}
        onClick={handleRemoveIds}
        sx={{ fontSize: 11 }}
      />
    </Stack>
  );
};

export default CheckboxButtonActions;

export const useCheckboxSelection = (idArray) => {
  const [rowSelection, setRowSelection] = useState({});
  const [allRowsSelected, setAllRowsSelected] = useState(false);
  const [someRowsSelected, setSomeRowsSelected] = useState(false);

  useEffect(() => {
    const handleSomeRowsSelected = idArray?.some(
      (document) => rowSelection[document?._id]
    );

    const handleAllRowsSelected = idArray?.every(
      (document) => rowSelection[document?._id]
    );

    setSomeRowsSelected(handleSomeRowsSelected);
    setAllRowsSelected(handleAllRowsSelected);
  }, [allRowsSelected, someRowsSelected, idArray, rowSelection]);

  const handleSelectedRow = (id) => {
    setRowSelection((prev) => {
      const selection = { ...prev };
      if (selection[id]) {
        delete selection[id];
      } else {
        selection[id] = true;
      }
      return selection;
    });
  };

  const handleParentCheckboxSelection = (event) => {
    const isChecked = event.target.checked;
    setRowSelection((prev) => {
      const newState = {};
      if (isChecked) {
        idArray?.forEach((document) => {
          newState[document?._id] = isChecked;
        });
      }
      return newState;
    });
  };

  return {
    rowSelection,
    allRowsSelected,
    someRowsSelected,
    handleSelectedRow,
    handleParentCheckboxSelection,
  };
};
