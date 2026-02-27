import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInvalidateQuery } from "../../../shared/hooks/invalidate-query";

import { AuthContext } from "../../../shared/context/auth-context";
import { useUser } from "../../../shared/hooks/user-hook";
import { useSnackbar } from "../../../shared/context/snackbar-context";

const formatDisplayDate = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatDisplayTime = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const MessageList = ({ teacherId, name, image, userType, chatId }) => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const [currentTeacherId, setCurrentTeacherId] = useState(teacherId);
  const scrollRef = useRef(null);
  const hasAppliedDeepLinkChatId = useRef(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [chatIsCompleted, setChatIsCompleted] = useState(false);
  const [confirmChatClose, setConfirmChatClose] = useState(false);
  const { invalidateQuery } = useInvalidateQuery();
  const { 
    getAllChats, 
    getAllChatMessages, 
    updateChat, 
    createChat,
    leaveChat,
} = useUser();
  const userId = auth?.user?._id;
  const userToken = auth?.token;
  const [messagesPage, setMessagesPage] = useState({
    page: 1,
    limit: 10,
  });
  const [chatsPage, setChatsPage] = useState({
    page: 1,
    limit: 5,
  });

  const [search, setSearch] = useState("");
  const [sendSearch, setSendSearch] = useState("");

  const { data: chatsResponse, isLoading: chatsLoading } = useQuery({
    queryKey: ["dashboard-chats", userId, chatsPage.page, chatsPage.limit, sendSearch],
    queryFn: () => getAllChats(userId, chatsPage.page, chatsPage.limit, sendSearch),
    enabled: Boolean(userId && userToken),
    staleTime: 60 * 1000,
  });

  const chats = Array.isArray(chatsResponse)
    ? chatsResponse
    : Array.isArray(chatsResponse?.chats)
    ? chatsResponse.chats
    : [];
  const chatsTotalPages = Number(chatsResponse?.totalPages) || 1;

  const selectedChat = useMemo(
    () => chats?.find((chat) => chat._id === selectedChatId) ?? null,
    [chats, selectedChatId]
  );

  useEffect(() => {
    if (!selectedChatId && chats?.length > 0 && !teacherId) {
      setSelectedChatId(chats?.[0]?._id);
    }
  }, [chats, selectedChatId, teacherId]);

  useEffect(() => {
    if (!chatId || !chats?.length || hasAppliedDeepLinkChatId.current) return;
    const chatExists = chats.some((chat) => String(chat?._id) === String(chatId));
    if (chatExists) {
      setSelectedChatId(chatId);
      hasAppliedDeepLinkChatId.current = true;
    }
  }, [chatId, chats]);

  const {
    data: messagesResponse,
    isLoading: messagesLoading,
    isFetching: messagesFetching,
  } = useQuery({
    queryKey: ["dashboard-chat-messages",userId, selectedChatId, messagesPage.page, messagesPage.limit],
    queryFn: () => getAllChatMessages(userId,selectedChatId,messagesPage.page,messagesPage.limit),
    enabled: !!(userId && selectedChatId && auth?.token),
    staleTime: 10 * 1000,
  });

  const messages = Array.isArray(messagesResponse)
    ? messagesResponse
    : Array.isArray(messagesResponse?.messages)
    ? messagesResponse.messages
    : [];

  const sendMessageMutation = useMutation({
    mutationKey: ["dashboard-send-chat-message"],
    mutationFn: async ({ chatId, text }) => await updateChat(userId, chatId, text),
    onSuccess: async () => {
      setMessageText("");
      await invalidateQuery("dashboard-chat-messages");
      await invalidateQuery("dashboard-chats");
    },
  });

  const newMessageMutation = useMutation({
    mutationKey: ["dashboard-new-chat-message"],
    mutationFn: async ({ employerData, teacherData, text }) => await createChat(employerData, teacherData, text),
    onSuccess: async (response) => {
        const createdChatId = response?.chat?._id;
        if (createdChatId) {
          setSelectedChatId(createdChatId);
        }
        setMessageText("");
        await invalidateQuery("dashboard-chat-messages");
        await invalidateQuery("dashboard-chats");
    },
  });

  const leaveChatMutation = useMutation({
    mutationKey: ["dashboard-leave-chat"],
    mutationFn: async ({ userId, chatId, userType }) => await leaveChat(userId, chatId, userType),
    onSuccess: async () => {
      setConfirmChatClose(false);
      await invalidateQuery("dashboard-chats");
    },
  });

  const handleLeaveChat = async () => {
    if(selectedChatId) {
    leaveChatMutation.mutate({ userId, chatId: selectedChatId, userType: auth?.user?.userType });
  }
};

  const handleChatsPageChange = (event, page) => {
    setChatsPage((prev) => ({
      ...prev,
      page,
    }));
  };


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, messagesFetching]);

  const existingConversation = chats?.find(
    (chat) => String(chat?.teacherId) === String(teacherId)
  );
  const isExistingConversation = Boolean(existingConversation);
  const isSending = sendMessageMutation.isPending || newMessageMutation.isPending;

  useEffect(() => {
    // If we arrived from a teacher profile and a chat already exists,
    // pin the selection to that existing chat instead of creating a new one.
    if (teacherId && existingConversation?._id && !selectedChatId) {
      setSelectedChatId(existingConversation._id);
    }
  }, [teacherId, existingConversation, selectedChatId]);


  // submit a new message
  const handleSubmit = () => {
    const cleanText = messageText.trim();
    if (cleanText.length === 0) return;

    const shouldCreateNewConversation =
      Boolean(teacherId) && !isExistingConversation && !selectedChatId;

      if(auth?.user?.userType === "employer" && !auth?.user?.buffetIsActive) {
        showSnackbar({
            message: "You need to activate your buffet to send messages.",
            severity: "error",
        });
        return;
    }

    if (shouldCreateNewConversation) {
        if(chats?.length >= 10) {
            showSnackbar({
                message: "You can have up to 10 active chats at a time.",
                severity: "error",
            });
            return;
        }

  
        const teacherData = {
            _id: teacherId,
            name: name,
            image: image,
            userType: userType,
        }
        const employerData = {
            _id: userId,
            name: auth.user.name,
            image: auth.user.image,
            userType: auth.user.userType,
        }
        setCurrentTeacherId("");
        newMessageMutation.mutate({ employerData, teacherData, text: cleanText });
    } else {
        if(auth?.user?.userType === "employer" && !auth?.user?.buffetIsActive) {
            showSnackbar({
                message: "You need to activate your buffet to send messages.",
                severity: "error",
            });
            return;
        }
        const targetChatId = selectedChatId || existingConversation?._id;
        if (!targetChatId) return;
        sendMessageMutation.mutate({ chatId: targetChatId, text: cleanText });

    }
  };

  // select chat by id and verify activity
  const handleSelectChat = (chat) => {
    setSelectedChatId(chat._id);
    if(chat.isCompleted || chat?.employerLeftChat || chat?.teacherLeftChat) {
        setChatIsCompleted(true);
    } else {
        setChatIsCompleted(false);
    }
  }

  // render messages with date dividers
  const renderMessagesWithDateDividers = () => {
    if (!messages.length) {
      return (
        <Stack
          sx={{ minHeight: 300 }}
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <ChatBubbleOutlineIcon color="disabled" />
          <Typography color="text.secondary">No messages yet</Typography>
        </Stack>
      );
    }

    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return sortedMessages.map((message, index) => {
      const messageDate = new Date(message.createdAt);
      const messageDay = messageDate.toDateString();
      const previousMessage = sortedMessages[index - 1];
      const previousDay = previousMessage
        ? new Date(previousMessage.createdAt).toDateString()
        : null;
      const showDateDivider = messageDay !== previousDay;
      const isMine =
        String(message.senderId) === String(userId) ||
        String(message?.senderId?._id) === String(userId);

      return (
        <React.Fragment key={message._id || `${message.createdAt}-${index}`}>
          {showDateDivider && (
            <Stack alignItems="center" sx={{ my: 2 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {formatDisplayDate(message.createdAt)}
                </Typography>
              </Box>
            </Stack>
          )}

          <Stack
            direction="row"
            justifyContent={isMine ? "flex-end" : "flex-start"}
            sx={{ mb: 1.5 }}
          >
            <Box
              sx={{
                maxWidth: "72%",
                px: 1.5,
                py: 1,
                borderRadius: 2.5,
                bgcolor: isMine ? "primary.main" : "action.hover",
                color: isMine ? "primary.contrastText" : "text.primary",
                borderTopRightRadius: isMine ? 0.75 : 2.5,
                borderTopLeftRadius: isMine ? 2.5 : 0.75,
              }}
            >
              <Typography variant="body2">{message.text || message.message || ""}</Typography>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: "block",
                  textAlign: isMine ? "right" : "left",
                  opacity: 0.75,
                  color: isMine ? "inherit" : "text.secondary",
                }}
              >
                {formatDisplayTime(message.createdAt)}
              </Typography>
            </Box>
          </Stack>
        </React.Fragment>
      );
    });
  };

  // find other participant in chat
  const otherParticipant = chats?.find((p) => p._id === selectedChatId)?.participantInfo?.find((p) => String(p.id) !== String(userId));

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>
                You can have up to 10 active chats at a time.
            </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ minHeight: { md: 600 }, height: { xs: "78vh", md: 600 }, maxHeight: { xs: "78vh", md: 600 } }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: 320 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Conversations
            </Typography>
             {/* <Box>
                <TextField
                onChange={(event) => setSearch(event.target.value)}
                InputProps={{ endAdornment: (
                    <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => setSendSearch(search)}>
                    <SearchIcon />
                </IconButton>
               {search.length > 0 && <IconButton onClick={() => {
                    setSendSearch("");
                    setSearch("");
                }}>
                    <ClearIcon />
                </IconButton>}
                    </Stack>
                )}}
                label="search" 
                size="small" 
                fullWidth 
                value={search} />
            </Box> */}
          </Box>
          

          <Box sx={{ flex: 1, minHeight: 0 }}>
          {!isExistingConversation && currentTeacherId && (
              <ListItemButton
                onClick={() => setSelectedChatId(null)}
                alignItems="flex-start"
                selected={true}
              >
                <ListItemAvatar>
                        <Avatar src={image || ""}>
                          {name?.slice(0, 1)}
                        </Avatar>
                      </ListItemAvatar>
                <ListItemText primary={name} secondary={
                    <>
                    <Typography variant="subtitle2" color="text.secondary">
                    {userType.charAt(0).toUpperCase() + userType.slice(1)} &bull; First message
                    </Typography>
                    </>
                } />
              </ListItemButton>
            )}
            {chatsLoading ? (
              <Stack spacing={1} sx={{ p: 1.5 }}>
                <Skeleton variant="rounded" height={56} />
                <Skeleton variant="rounded" height={56} />
                <Skeleton variant="rounded" height={56} />
              </Stack>
            ) : chats.length === 0 ? (
              <Stack alignItems="center" justifyContent="center" sx={{ p: 3 }}>
                <Typography color="text.secondary" variant="body2">
                  No active chats
                </Typography>
              </Stack>
            ) : (
              <List disablePadding sx={{ maxHeight: 540, overflowY: "auto" }}>
                {/* Map over chats and render list */}
                {chats.map((chat) => {
                  const otherParticipant = chat?.participantInfo?.find(
                    (participant) => String(participant.id) !== String(userId)
                  );
                  return (
                    <React.Fragment key={chat._id}>
                      <ListItemButton
                        selected={chat._id === selectedChatId}
                        onClick={() => handleSelectChat(chat)}
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar src={otherParticipant?.image || ""}>
                            {(otherParticipant?.name || "U").slice(0, 1)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={otherParticipant?.name || "Unknown user"}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block" }}
                              >
                                {chat.lastMessageDate
                                  ? formatDisplayDate(chat.lastMessageDate)
                                  : ""}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: "block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: 190,
                                }}
                              >
                                {chat.lastMessage || "No messages yet"}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            )}
          </Box>

            <Stack
              direction="row"
              justifyContent="center"
              sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}
            >
              <Pagination
                size="small"
                count={chatsTotalPages}
                page={chatsPage.page}
                onChange={handleChatsPageChange}
              />
            </Stack>
          
        </Box>

        <Box
          sx={{
            flex: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 500,
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={700}>
              {selectedChat
                ? selectedChat?.participantInfo?.find(
                    (participant) => String(participant.id) !== String(userId)
                  )?.name || "Conversation"
                : "Chat"}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
           {auth.user.userType === "employer" && selectedChatId && <Tooltip title="View Profile">
            <IconButton component={Link} to={`/teachers/${teacherId  || otherParticipant?.id}`}>
                <AssignmentIndIcon />
            </IconButton>
            </Tooltip>}

            {/* Dialog to confirm closing chat */}
            <Dialog
        disableScrollLock={true}
        open={confirmChatClose}
        onClose={() => setConfirmChatClose(false)}
        aria-labelledby="delete-your-job"
        aria-describedby="confirm deletion"
      >
        <DialogTitle>End Conversation?</DialogTitle>
        <DialogContent>
         You will not be able to access this conversation anymore.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmChatClose(false)}>Cancel</Button>
          <Button color="error" onClick={handleLeaveChat}>Confirm Leave</Button>
        </DialogActions>
      </Dialog>

           {selectedChatId && !chatIsCompleted && <Tooltip title="End conversation">
            <IconButton onClick={() => setConfirmChatClose(true)}>
                <ExitToAppIcon color="error" />
            </IconButton>
            </Tooltip>}
            </Stack>

          </Box>

          <Box ref={scrollRef} sx={{ flex: 1, overflowY: "auto", px: 2, py: 1.5 }}>
            {chats.length === 0 ? (
              <Stack
                sx={{ minHeight: 300 }}
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <ChatBubbleOutlineIcon color="disabled" />
                <Typography color="text.secondary">No conversations yet</Typography>
              </Stack>
            ) : !selectedChatId ? (
              <Stack
                sx={{ minHeight: 300 }}
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Typography color="text.secondary">
                  Select a conversation
                </Typography>
              </Stack>
            ) : messagesLoading || messagesFetching ? (
              <Stack spacing={1.5}>
                <Skeleton variant="rounded" width="60%" height={54} />
                <Skeleton variant="rounded" width="40%" height={54} sx={{ ml: "auto" }} />
                <Skeleton variant="rounded" width="55%" height={54} />
              </Stack>
            ) : (
              renderMessagesWithDateDividers()
            )}
          </Box>

          <Divider />
          <Box sx={{ p: 1.25 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
              disabled={messagesFetching || isSending || chatIsCompleted}
                fullWidth
                size="small"
                multiline
                maxRows={4}
                placeholder="Type a message..."
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSubmit}
                disabled={
                  isSending ||
                  messageText.trim().length === 0 || 
                  chatIsCompleted
                }
              >
                {sendMessageMutation.isPending  || newMessageMutation.isPending ? (
                  <CircularProgress size={20} />
                ) : (
                  <SendIcon />
                )}
              </IconButton>
            </Stack>
            {(sendMessageMutation.isError || newMessageMutation.isError) && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {sendMessageMutation.error?.message || newMessageMutation.error?.message || "Failed to send message."}
              </Alert>
            )}
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default MessageList;