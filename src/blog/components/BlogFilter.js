import React, { useState } from "react";

import moment from "moment";

import {
  Chip,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
} from "@mui/material";

import { blogCategories } from "../../shared/util/ThaiData";

const currentDate = moment();
const last7Days = moment().subtract(7, "days");
const last14Days = moment().subtract(14, "days");
const last30Days = moment().subtract(30, "days");

const searchDates = [
  { id: "All", date: null },
  { id: "Today", date: currentDate },
  { id: "7 Days", date: last7Days },
  { id: "14 Days", date: last14Days },
  { id: "30 Days", date: last30Days },
];

const BlogFilter = ({ onDataChange }) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
    onDataChange({ search: event.target.value, date, category });
  };

  const dateChangeHandler = (selectedDate) => {
    const formattedDate = moment(selectedDate).startOf("day").toISOString();
    setDate(formattedDate);
    onDataChange({
      search,
      date: formattedDate,
      category,
    });
    console.log("SELECTED DATE - was compared", formattedDate);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
    onDataChange({ search, date, category: event.target.value });
  };

  return (
    <Paper elevation={0} sx={{ padding: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl>
          <FormLabel>Search Content</FormLabel>
          <OutlinedInput
            style={{ minWidth: 300 }}
            fullWidth
            id="search"
            type="text"
            value={search}
            onChange={inputChangeHandler}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Categories</FormLabel>
          <Select
            fullWidth
            sx={{ borderRadius: 20, minWidth: 200 }}
            id="category"
            value={category}
            onChange={categoryChangeHandler}
          >
            <MenuItem>Any</MenuItem>
            {blogCategories.map((category, i) => (
              <MenuItem key={i} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={1} direction="row" sx={{ margin: "1rem 0 0 0" }}>
        {searchDates.map(({ id, date }, i) => (
          <Chip
            variant="outlined"
            sx={{ minWidth: 75 }}
            id={id}
            clickable={true}
            label={id}
            value={date}
            onClick={() => dateChangeHandler(date)} // Convert date to ISO string before passing to handler
            key={i}
          />
        ))}
      </Stack>
      <Divider variant="inset" sx={{ margin: "1rem 0 0 0" }} />
    </Paper>
  );
};

export default BlogFilter;
