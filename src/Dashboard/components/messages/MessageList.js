import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../../shared/context/auth-context";
import { useUser } from "../../../shared/hooks/user-hook";

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
  const scrollRef = useRef(null);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [messageText, setMessageText] = useState("");
  const { getAllChats, getAllChatMessages, updateChat, createChat } = useUser();
  const userId = auth?.user?._id;
  const userToken = auth?.token;
  const [messagesPage, setMessagesPage] = useState({
    page: 1,
    limit: 10,
  });

  const { data: chatsResponse, isLoading: chatsLoading } = useQuery({
    queryKey: ["dashboard-chats", userId],
    queryFn: () => getAllChats(userId),
    enabled: Boolean(userId && userToken),
    staleTime: 60 * 1000,
  });

  const chats = Array.isArray(chatsResponse)
    ? chatsResponse
    : Array.isArray(chatsResponse?.chats)
    ? chatsResponse.chats
    : [];

  const selectedChat = useMemo(
    () => chats?.find((chat) => chat._id === selectedChatId) ?? null,
    [chats, selectedChatId]
  );

  useEffect(() => {
    if (!selectedChatId && chats?.length > 0) {
      setSelectedChatId(chats?.[0]?._id);
    }
  }, [chats, selectedChatId]);

  useEffect(() => {
    if (!chatId || !chats?.length) return;
    const chatExists = chats.some((chat) => String(chat?._id) === String(chatId));
    if (chatExists && selectedChatId !== chatId) {
      setSelectedChatId(chatId);
    }
  }, [chatId, chats, selectedChatId]);

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
      await queryClient.invalidateQueries({
        queryKey: ["dashboard-chat-messages", selectedChatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard-chats", userId],
      });
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
        await queryClient.invalidateQueries({
            queryKey: ["dashboard-chats", userId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["dashboard-chat-messages"],
        });
    },
  });

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

  const handleSubmit = () => {
    const cleanText = messageText.trim();
    if (cleanText.length === 0) return;

    const shouldCreateNewConversation =
      Boolean(teacherId) && !isExistingConversation && !selectedChatId;

    if (shouldCreateNewConversation) {
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
        newMessageMutation.mutate({ employerData, teacherData, text: cleanText });
    } else {
        const targetChatId = selectedChatId || existingConversation?._id;
        if (!targetChatId) return;
        sendMessageMutation.mutate({ chatId: targetChatId, text: cleanText });

    }
  };

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

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ minHeight: { md: 600 } }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: 320 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Conversations
            </Typography>
          </Box>
          
          {!isExistingConversation && teacherId &&(
              <ListItemButton
                onClick={() => {}}
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
                {/* add a temporary placeholder for new conversation not yet started */}
       
            {/* list existing conversations */}
              {chats.map((chat) => {
                const otherParticipant = chat?.participantInfo?.find(
                  (participant) => String(participant.id) !== String(userId)
                );
                return (
                  <React.Fragment key={chat._id}>
                    <ListItemButton
                      selected={chat._id === selectedChatId}
                      onClick={() => setSelectedChatId(chat._id)}
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

        <Box
          sx={{
            flex: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 500,
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={700}>
              {selectedChat
                ? selectedChat?.participantInfo?.find(
                    (participant) => String(participant.id) !== String(userId)
                  )?.name || "Conversation"
                : "Chat"}
            </Typography>
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
              disabled={messagesFetching || isSending}
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
                  messageText.trim().length === 0
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