import { MessageResponse } from "../service/chatsService";

// date formatter for "17 Jun. 24"
const formatDate = (date: string): string => {
    const dateObject = new Date(date);
    
    if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date format");
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short", 
        year: "2-digit", 
    };

    return new Intl.DateTimeFormat("en-GB", options).format(dateObject);
};

export const groupMessagesByDate = (messages: MessageResponse[]): { date: string, messages: MessageResponse[] }[] => {
    const groupedMessages: { date: string, messages: MessageResponse[] }[] = [];
    let currentDate: string | null = null;

    messages.forEach((message) => {
        const messageDate = formatDate(message.sent_at);

        if (messageDate !== currentDate) {
            currentDate = messageDate;
            groupedMessages.push({ date: messageDate, messages: [] });
        }

        groupedMessages[groupedMessages.length - 1].messages.push(message);
    });

    return groupedMessages;
};
