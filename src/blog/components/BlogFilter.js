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
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { blogCategories } from "../../shared/util/ThaiData";

const StyledStackChipContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  margin: "1rem 0 0 0",
  gap: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    margin: "1rem auto 0",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem auto 0",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const StyledStackContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    alignItems: "stretch",
    flexDirection: "column",

    width: "100%",
  },
}));

const currentDate = moment();
const last7Days = moment().subtract(7, "days");
const last14Days = moment().subtract(14, "days");
const last30Days = moment().subtract(30, "days");

const searchDates = [
  { id: "All", date: "" },
  { id: "Today", date: currentDate },
  { id: "7 Days", date: last7Days },
  { id: "14 Days", date: last14Days },
  { id: "30 Days", date: last30Days },
];

const BlogFilter = ({ onDataChange, onQuerySelect, onClearAll }) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Any");
  const [chipIndex, setChipIndex] = useState(0);

  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
    onDataChange({ search: event.target.value, date, category });
  };

  const dateChangeHandler = (selectedDate) => {
    if (!selectedDate) {
      setDate("");
      onDataChange({ search, date: "", category });
      return;
    }

    const formattedDate = moment(selectedDate).startOf("day").toISOString() || "";
    setDate(formattedDate);
    onDataChange({
      search,
      date: formattedDate,
      category,
    });
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
    onDataChange({ search, date, category: event.target.value });
  };

  const clearSearchHandler = () => {
    setSearch("");
    setDate("");
    setCategory("Any");
    onDataChange({ search: "", date: "", category: "Any" });
    setChipIndex(0);
    onClearAll();
  };

  const queryDbHandler = () => {
    onQuerySelect();
  }

  const isClearAll =
    (search?.length ?? 0) > 0 || (date?.length ?? 0) > 0 || category !== "Any";

  return (
    <Paper elevation={0} sx={{ padding: 2, borderRadius: "5px 5px 0 0" }}>
      <StyledStackContainer>
        <FormControl>
          <FormLabel>Search Content</FormLabel>
          <OutlinedInput
            sx={{ width: { xs: "100%", sm: 300, md: 400 }, borderRadius: 20 }}
            fullWidth
            id="search"
            type="text"
            value={search}
            onChange={inputChangeHandler}
            placeholder="Search for content"
          endAdornment={
          <InputAdornment position="end">
            <Stack direction="row" spacing={1}>
            {search.length > 0 && <IconButton
            color="primary"
            onClick={queryDbHandler}
            >
              <ArrowCircleRightIcon />
              </IconButton>}
            </Stack>
          </InputAdornment>
          }
            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Categories</FormLabel>
          <Select
            fullWidth
            sx={{ borderRadius: 20, minWidth: 200 }}
            id="category"
            value={category || "Any"}
            onChange={categoryChangeHandler}
          >
            <MenuItem value="Any">Any</MenuItem>
            {blogCategories.map((category, i) => (
              <MenuItem key={i} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isClearAll && <Chip label="clear All" onClick={clearSearchHandler} />}
      </StyledStackContainer>

      <StyledStackChipContainer>
        {searchDates.map(({ id, date }, i) => (
          <Chip
            sx={{ minWidth: 75 }}
            variant={i === chipIndex ? "filled" : "outlined"}
            id={id}
            clickable={true}
            label={id}
            value={date}
            onClick={() => {
              // Clicking the currently-selected chip toggles it back to "All"
              if (i === chipIndex) {
                setChipIndex(0);
                dateChangeHandler("");
                return;
              }

              setChipIndex(i);
              dateChangeHandler(date);
            }} // Convert date to ISO string before passing to handler
            key={i}
          />
        ))}
      </StyledStackChipContainer>
      <Divider variant="inset" sx={{ margin: "1rem 0 0 0" }} />
    </Paper>
  );
};

export default BlogFilter;
