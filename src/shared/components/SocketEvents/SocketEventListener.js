import React, { useEffect,useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useInvalidateQuery } from '../../hooks/invalidate-query';
import { useSocket } from '../../context/socket-io-context';
import { useSnackbar } from '../../context/snackbar-context';

const NotificationsList = {
    newMessage: 'newMessage',
    newJobApplications: 'newJobApplications',
    newRecruitmentOffer: 'newRecruitmentOffer',
}

const SocketEventListener = () => {
    const auth = useContext(AuthContext);
    const { invalidateQuery } = useInvalidateQuery();
    const { socket } = useSocket();
    const { showSnackbar } = useSnackbar();
    useEffect(() => {
        if(!socket) return;

        socket.on(NotificationsList.newMessage, (data) => {
            const { message, senderId, chatId, userData } = data;
            const { name, image, userType, id } = userData;

            invalidateQuery('dashboard-chat-messages');
            invalidateQuery('dashboard-chats');
            const text = message.slice(0,100) + (message.length > 100 ? '...' : '');
            showSnackbar({
                message: text,
                severity: 'info',
                path: `/users/${auth?.user?._id}?sendMessage=true&chatId=${chatId}`,
                image: image,
                name: name,
            });
        });

        socket.on(NotificationsList.newJobApplications, (data) => {
            const { applicantName, image, jobName } = data;
            invalidateQuery("userApplications");
            showSnackbar({
                message: `Application from ${applicantName} for ${jobName}`,
                severity: 'info',
                path: `/users/${auth?.user?._id}`,
                image: image ?? "",
                name: applicantName,
            })
        });

        socket.on(NotificationsList.newRecruitmentOffer, (data) => {
            console.log('New recruitment offer received:', data);
            invalidateQuery('recruitmentOffers');
        });

        return () => {
            socket.off(NotificationsList.newMessage);
            socket.off(NotificationsList.newJobApplications);
            socket.off(NotificationsList.newRecruitmentOffer);
        };
    }, [socket]);
}

export default SocketEventListener;