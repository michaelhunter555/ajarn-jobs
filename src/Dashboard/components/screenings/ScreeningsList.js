import React, { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../../../shared/context/auth-context";
import CheckboxButtonActions, {
  useCheckboxSelection,
} from "../../../shared/hooks/checkbox-hook";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";
import { useUser } from "../../../shared/hooks/user-hook";
import { useScreenings } from "../../../shared/hooks/screenings-hook";
import { useJob } from "../../../shared/hooks/jobs-hook";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ScreeningsList = () => {
  const auth = useContext(AuthContext);
  const { invalidateQuery } = useInvalidateQuery();
  const { getJobsByUserId } = useJob();

  const { getScreenings, createScreening, deleteScreening, updateScreening } = useScreenings();
  const [page, setPage] = useState({
    page: 1,
    limit: 7,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const initialQuestion = () => ({
    isPublic: true,
    question: "",
    questionType: "multiple choice",
    points: 1,
    maxTimeAllowed: 60,
    requiresReview: true,
    correctAnswer: "a",
    answers: {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
    },
    shortAnswer: "",
    longAnswer: "",
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    jobId: "",
    date: "",
    maxTimeAllowed: 30,
    totalScore: 0,
    questions: [initialQuestion()],
  });
 
  const { data: screenings, isLoading: screeningsIsLoading } = useQuery({
    queryKey: ["screenings", auth?.user?._id],
    queryFn: () => getScreenings(auth?.user?._id),
    enabled: !!(auth?.user?._id && auth?.token),
    staleTime: 10 * 60 * 1000 
  });

  const { data: jobs = [], isLoading: jobsIsLoading } = useQuery({
    queryKey: ["screening-jobs", auth?.user?._id],
    queryFn: () => getJobsByUserId(auth?.user?._id),
    enabled: Boolean(auth?.user?._id && auth?.token),
    staleTime: 5 * 60 * 1000,
  });

  const {
    rowSelection,
    allRowsSelected,
    someRowsSelected,
    handleSelectedRow,
    handleParentCheckboxSelection,
  } = useCheckboxSelection(screenings?.screenings);

  const deleteScreeningMutation = useMutation({
    mutationKey: ["deleteScreening"],
    mutationFn: (screeningId) => deleteScreening(screeningId),
    onSuccess: async () => {
      await invalidateQuery("screenings");
      setPage({
        page: 1,
        limit: 7,
      });
    }
  });

  const createScreeningMutation = useMutation({
    mutationKey: ["createScreening"],
    mutationFn: (screening) => createScreening(screening),
    onSuccess: async () => {
      await invalidateQuery("screenings");
      setIsCreating(false);
      setCreateError("");
      setForm({
        title: "",
        description: "",
        jobId: "",
        date: "",
        maxTimeAllowed: 30,
        totalScore: 0,
        questions: [initialQuestion()],
      });
    },
    onError: (err) => {
      setCreateError(err?.message || "Failed to create screening.");
    },
  });

  const updateScreeningMutation = useMutation({
    mutationKey: ["updateScreening"],
    mutationFn: (screeningId) => updateScreening(screeningId),
    onSuccess: async () => {
      await invalidateQuery("screenings");
      setPage({
        page: 1,
        limit: 7,
      });
    }
  });

  //from current set of jobs, return jobs where the userId matches
  const noScreeningsYet = screenings?.screenings?.length === 0;

  let apps = screenings?.totalScreenings;
  const selectedKeys = Object.keys(rowSelection);
  const noKeys =
    Object.keys(rowSelection).length === 0 ||
    Object.values(rowSelection).every((val) => !val);

  const handleRemoveApplications = async () => {
    if (selectedKeys.length > 0) {
      await deleteScreeningMutation.mutateAsync(selectedKeys);
    }
  };

  const updateFormField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuestionField = (index, field, value) => {
    setForm((prev) => {
      const nextQuestions = [...prev.questions];
      nextQuestions[index] = { ...nextQuestions[index], [field]: value };
      return { ...prev, questions: nextQuestions };
    });
  };

  const updateQuestionAnswer = (index, key, value) => {
    setForm((prev) => {
      const nextQuestions = [...prev.questions];
      nextQuestions[index] = {
        ...nextQuestions[index],
        answers: {
          ...nextQuestions[index].answers,
          [key]: value,
        },
      };
      return { ...prev, questions: nextQuestions };
    });
  };

  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, initialQuestion()],
    }));
  };

  const removeQuestion = (index) => {
    setForm((prev) => {
      if (prev.questions.length === 1) return prev;
      const nextQuestions = prev.questions.filter((_, i) => i !== index);
      return { ...prev, questions: nextQuestions };
    });
  };

  const handleCreateScreening = async () => {
    setCreateError("");
    if (!form.title.trim() || !form.description.trim() || !form.jobId || !form.date) {
      setCreateError("Please complete title, description, job, and date.");
      return;
    }

    const hasInvalidQuestion = form.questions.some((q) => !q.question.trim());
    if (hasInvalidQuestion) {
      setCreateError("Each question needs text.");
      return;
    }

    const totalScore = form.questions.reduce((sum, q) => sum + Number(q.points || 0), 0);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      jobId: form.jobId,
      date: new Date(form.date).toISOString(),
      maxTimeAllowed: Number(form.maxTimeAllowed || 0),
      totalScore,
      questions: form.questions.map((q) => ({
        isPublic: Boolean(q.isPublic),
        question: q.question.trim(),
        questionType: q.questionType,
        points: Number(q.points || 1),
        maxTimeAllowed: Number(q.maxTimeAllowed || 0),
        requiresReview: Boolean(q.requiresReview),
        correctAnswer: q.correctAnswer || undefined,
        answers: q.answers,
        shortAnswer: q.shortAnswer || "",
        longAnswer: q.longAnswer || "",
      })),
    };

    createScreeningMutation.mutate(payload);
  };

  return (
    <>
      {isCreating ? (
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="small" onClick={() => setIsCreating(false)}>
                <ArrowBackIcon fontSize="small" /> 
              </IconButton>
              <Typography variant="subtitle2" color="text.secondary">
                Go back |
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Create Screening
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={addQuestion}>
                Add Question
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleCreateScreening}
                disabled={createScreeningMutation.isPending}
              >
                {createScreeningMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </Stack>
          </Stack>

          {createError && (
            <Alert severity="error" sx={{ mb: 1.5 }} action={
              <Button size="small" onClick={() => setCreateError("")}>
                Close
              </Button>
            }>
              {createError}
            </Alert>
          )}

          <Stack spacing={1.25}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <TextField
                size="small"
                label="Title"
                fullWidth
                value={form.title}
                onChange={(e) => updateFormField("title", e.target.value)}
              />
              <TextField
                size="small"
                select
                label="Job"
                fullWidth
                value={form.jobId}
                onChange={(e) => updateFormField("jobId", e.target.value)}
                disabled={jobsIsLoading}
              >
                {jobs.map((job) => (
                  <MenuItem key={job?._id} value={job?._id}>
                    {job?.title}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <TextField
              size="small"
              multiline
              minRows={2}
              label="Description"
              value={form.description}
              onChange={(e) => updateFormField("description", e.target.value)}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <TextField
                size="small"
                type="datetime-local"
                label="Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.date}
                onChange={(e) => updateFormField("date", e.target.value)}
              />
              <TextField
                size="small"
                type="number"
                label="Max Time (mins)"
                fullWidth
                value={form.maxTimeAllowed}
                onChange={(e) => updateFormField("maxTimeAllowed", e.target.value)}
              />
            </Stack>

            <Divider />

            {form.questions.map((question, index) => (
              <Paper key={index} variant="outlined" sx={{ p: 1.25 }}>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2">Question {index + 1}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeQuestion(index)}
                      disabled={form.questions.length === 1}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>

                  <TextField
                    size="small"
                    label="Question"
                    fullWidth
                    value={question.question}
                    onChange={(e) => updateQuestionField(index, "question", e.target.value)}
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <TextField
                      size="small"
                      select
                      label="Type"
                      value={question.questionType}
                      fullWidth
                      onChange={(e) => updateQuestionField(index, "questionType", e.target.value)}
                    >
                      <MenuItem value="multiple choice">Multiple choice</MenuItem>
                      <MenuItem value="multi-select">Multi-select</MenuItem>
                      <MenuItem value="short answer">Short answer</MenuItem>
                      <MenuItem value="long answer">Long answer</MenuItem>
                    </TextField>
                    <TextField
                      size="small"
                      type="number"
                      label="Points"
                      value={question.points}
                      onChange={(e) => updateQuestionField(index, "points", e.target.value)}
                    />
                    <TextField
                      size="small"
                      type="number"
                      label="Time (sec)"
                      value={question.maxTimeAllowed}
                      onChange={(e) => updateQuestionField(index, "maxTimeAllowed", e.target.value)}
                    />
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox
                      size="small"
                      checked={Boolean(question.isPublic)}
                      onChange={(e) =>
                        updateQuestionField(index, "isPublic", e.target.checked)
                      }
                    />
                    <Typography variant="caption" color="text.secondary">
                      Public question (can be reused by other employers)
                    </Typography>
                  </Stack>

                  {(question.questionType === "multiple choice" ||
                    question.questionType === "multi-select") && (
                    <>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <TextField
                          size="small"
                          label="A"
                          fullWidth
                          value={question.answers.a}
                          onChange={(e) => updateQuestionAnswer(index, "a", e.target.value)}
                        />
                        <TextField
                          size="small"
                          label="B"
                          fullWidth
                          value={question.answers.b}
                          onChange={(e) => updateQuestionAnswer(index, "b", e.target.value)}
                        />
                        <TextField
                          size="small"
                          label="C"
                          fullWidth
                          value={question.answers.c}
                          onChange={(e) => updateQuestionAnswer(index, "c", e.target.value)}
                        />
                      </Stack>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <TextField
                          size="small"
                          label="D"
                          fullWidth
                          value={question.answers.d}
                          onChange={(e) => updateQuestionAnswer(index, "d", e.target.value)}
                        />
                        <TextField
                          size="small"
                          select
                          label="Correct"
                          value={question.correctAnswer}
                          onChange={(e) => updateQuestionField(index, "correctAnswer", e.target.value)}
                          sx={{ minWidth: 140 }}
                        >
                          <MenuItem value="a">A</MenuItem>
                          <MenuItem value="b">B</MenuItem>
                          <MenuItem value="c">C</MenuItem>
                          <MenuItem value="d">D</MenuItem>
                          <MenuItem value="e">E</MenuItem>
                          <MenuItem value="f">F</MenuItem>
                        </TextField>
                      </Stack>
                    </>
                  )}

                  {question.questionType === "short answer" && (
                    <TextField
                      size="small"
                      label="Short Answer Prompt"
                      value={question.shortAnswer}
                      onChange={(e) => updateQuestionField(index, "shortAnswer", e.target.value)}
                    />
                  )}

                  {question.questionType === "long answer" && (
                    <TextField
                      size="small"
                      label="Long Answer Prompt"
                      multiline
                      minRows={2}
                      value={question.longAnswer}
                      onChange={(e) => updateQuestionField(index, "longAnswer", e.target.value)}
                    />
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Paper>
      ) : (
      <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography variant="subtitle2">You have</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {apps} {apps > 0 && apps <= 1 ? " screening" : " screenings"}
        </Typography>
      </Box>
        <Typography variant="subtitle2" color="text.secondary">
          Create screenings and send them to your applicants.
        </Typography>
      <TableContainer component={Paper}>
        <Stack sx={{ padding: 1}} direction="row" alignItems="center" justifyContent="space-between">

        <CheckboxButtonActions
          handleRemoveIds={handleRemoveApplications}
          selectedKeys={selectedKeys}
          noKeys={noKeys}
        />
        {screenings?.screenings?.length > 0 && (
          <Chip
            size="small"
            clickable
            color="primary"
            label="Select Applicants"
            variant="outlined"
            icon={<PersonAddIcon />}
            onClick={() => setIsCreating(true)}
          />
        )}
        <Chip
        size="small"
          clickable
          color="primary"
          label="Create"
          icon={<AddIcon />}
          onClick={() => setIsCreating(true)}
        />
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  size="small"
                  checked={
                    (allRowsSelected && selectedKeys.length > 0) ?? false
                  }
                  indeterminate={!allRowsSelected && someRowsSelected}
                  onChange={handleParentCheckboxSelection}
                />
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User Attempts</TableCell>
              <TableCell>Max time</TableCell>
              <TableCell># of questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {screeningsIsLoading || updateScreeningMutation.isPending || deleteScreeningMutation.isPending ? (
              <TableRow>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
              </TableRow>
            ) : (
              screenings &&
              screenings?.screenings?.map((screening, i) => (
                <TableRow key={screening?._id}>
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={rowSelection[screening?._id] ?? false}
                      onChange={() => handleSelectedRow(screening?._id)}
                      value={!!rowSelection[screening?._id]}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontSize: 10 }}
                    >
                      {screening?.date?.split("T")[0]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {screening?.jobId ? (
                      <Link
                        component={RouterLink}
                        to={`/screenings/${
                          screening?._id
                        }/${screening?.title
                          ?.replace(/\s+/g, "-")
                          ?.toLowerCase()}`}
                      >
                        {screening?.title}
                      </Link>
                    ) : (
                      <Typography variant="subtitle2" color="text.secondary">
                        Screening Removed or Expired
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{screening?.totalUsersTaken}</TableCell>
                  <TableCell>{screening?.maxTimeAllowed}</TableCell>
                  <TableCell>{screening?.questions?.length}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Stack alignItems="end">
          <Pagination
            size="small"
            count={screenings?.totalPages}
            page={page?.page}
            onChange={(event, val) => {
              setPage({
                page: val,
                limit: 7,
              });
            }}
            defaultPage={1}
            showFirstButton
            showLastButton
          />
        </Stack>
      </TableContainer>
      </>
      )}
    </>
  );
};

export default ScreeningsList;
