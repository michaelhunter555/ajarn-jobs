import React from 'react';

import { MdVerified } from 'react-icons/md';

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));

const StyledAvatar = styled(Avatar)({
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
});

const Sponsors = (props) => {
  return (
    <>
      <StyledList>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <StyledAvatar
              alt={props.companyId}
              src={props.logo}
              variant="square"
            />
          </ListItemAvatar>
          <Stack spacing={0}>
            <ListItemText
              primary={
                <>
                  {props.company}
                  <Tooltip title={`${props.company} has been verified!`}>
                    <IconButton small="true">
                      <MdVerified style={{ color: "#85c3fd" }} size={16} />
                    </IconButton>
                  </Tooltip>
                </>
              }
              secondary={
                <>
                  {props.salary} - {props.location}
                </>
              }
            />
          </Stack>
        </ListItemButton>
        <Divider />
      </StyledList>
    </>
  );
};

export default Sponsors;
