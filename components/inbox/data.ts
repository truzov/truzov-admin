export interface User {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isActive?: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  time: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "Xian Zhou",
    avatar: "/images/user/user_01.png",
    initials: "XZ",
    lastMessage: "You: Perfect! Let's discuss integration...",
    time: "4:05 PM",
    isActive: true,
  },
  {
    id: "2",
    name: "Sarah Smith",
    avatar: "/images/user/user_02.png",
    initials: "SS",
    lastMessage: "Can you send the report?",
    time: "5 mins",
    unreadCount: 1,
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "/images/user/user_03.png",
    initials: "MC",
    lastMessage: "Meeting rescheduled to...",
    time: "1 hour",
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "/images/user/user_04.png",
    initials: "ED",
    lastMessage: "Thanks for the update!",
    time: "2 hours",
  },
  {
    id: "5",
    name: "David Wilson",
    avatar: "/images/user/user_05.png",
    initials: "DW",
    lastMessage: "Project timeline looks...",
    time: "1 day",
    unreadCount: 5,
  },
  {
    id: "6",
    name: "Jessica Taylor",
    avatar: "/images/user/user_06.png",
    initials: "JT",
    lastMessage: "You: I'll check it out.",
    time: "2 days",
  },
  {
    id: "7",
    name: "James Anderson",
    avatar: "/images/user/user_07.png",
    initials: "JA",
    lastMessage: "Please review the attached...",
    time: "3 days",
  },
  {
    id: "8",
    name: "Olivia Martinez",
    avatar: "/images/user/user_08.png",
    initials: "OM",
    lastMessage: "Great job on the presentation!",
    time: "4 days",
  },
  {
    id: "9",
    name: "Robert Thomas",
    avatar: "/images/user/user_09.png",
    initials: "RT",
    lastMessage: "You: Sounds good, talk soon.",
    time: "1 week",
  },
  {
    id: "10",
    name: "Jennifer Garcia",
    avatar: "/images/user/user_10.png",
    initials: "JG",
    lastMessage: "Invoice #1023 simulated...",
    time: "1 week",
  },
];

export const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey, are we still on for the meeting tomorrow?",
    sender: "other",
    time: "10:00 AM",
  },
  {
    id: "2",
    content: "Yes, 2 PM right?",
    sender: "me",
    time: "10:05 AM",
  },
  {
    id: "3",
    content: "Correct. I'll send the agenda shortly.",
    sender: "other",
    time: "10:06 AM",
  },
  {
    id: "4",
    content: "Great, thanks! Also, could you bring the latest sales report?",
    sender: "me",
    time: "10:10 AM",
  },
  {
    id: "5",
    content: "Sure, printing it now.",
    sender: "other",
    time: "10:12 AM",
  },
  {
    id: "6",
    content:
      "Hey John, I am looking for the best admin template. Could you please help me to find it out? 😯",
    sender: "other",
    time: "4:02 PM",
  },
  {
    id: "7",
    content: "Stack admin is the responsive bootstrap 4 admin template.",
    sender: "me",
    time: "4:02 PM",
  },
  {
    id: "8",
    content: "Looks clean and fresh UI. 😃",
    sender: "other",
    time: "4:02 PM",
  },
  {
    id: "9",
    content: "Perfect! Let's discuss integration details later.",
    sender: "me",
    time: "4:05 PM",
  },
];
