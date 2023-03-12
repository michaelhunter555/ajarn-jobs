import React, { useEffect, useState } from "react";

import {
  Avatar,
  AvatarItem,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

const TeacherItem = ({ teachers }) => {
  const [teacher, setTeacher] = useState([]);

  const handleTeacherClick = (teacher) => {
    setTeacher(teacher);
  };

  useEffect(() => {
    setTeacher(teachers);
  }, [teachers]);

  return (
    <div style={{ display: "flex" }}>
      <Paper
        sx={{ flex: 1, height: "500px", overflow: "scroll", margin: "10px" }}
      >
        <List>
          {teachers.map((teacher) => (
            <ListItemButton
              key={teacher.id}
              onClick={() => handleTeacherClick(teacher)}
            >
              <AvatarItem>
                <Avatar
                  src={teacher.image}
                  alt={teacher.name}
                  variant="square"
                ></Avatar>
              </AvatarItem>
              <ListItemText>{teacher.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Paper>
      <Paper
        sx={{ flex: 3, height: "500px", overflow: "scroll", margin: "10px" }}
      >
        {teacher && (
          <ListItemButton>
            <ListItemText>{teacher.name}</ListItemText>
          </ListItemButton>
        )}

        {!teacher && (
          <ListItemButton>
            <ListItemText>Select a Teacher</ListItemText>
          </ListItemButton>
        )}
      </Paper>
    </div>
  );
};

export default TeacherItem;
