import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  orderBy, 
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Chat, Message, UserProfile } from '../types';

export const chatService = {
  // Get or create a chat between two users
  getOrCreateChat: async (user1: UserProfile, user2: UserProfile) => {
    const participants = [user1.uid, user2.uid].sort();
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', '==', participants));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Chat;
    }

    const newChatRef = doc(chatsRef);
    const chatData = {
      id: newChatRef.id,
      participants,
      participantData: {
        [user1.uid]: { name: user1.fullName, avatar: user1.profilePic || '' },
        [user2.uid]: { name: user2.fullName, avatar: user2.profilePic || '' }
      },
      updatedAt: serverTimestamp()
    };

    await setDoc(newChatRef, chatData);
    return chatData as unknown as Chat;
  },

  sendMessage: async (chatId: string, senderId: string, senderName: string, text: string) => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      text,
      senderId,
      senderName,
      createdAt: serverTimestamp()
    });

    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
      lastMessageBy: senderId,
      updatedAt: serverTimestamp()
    });
  },

  subscribeToMessages: (chatId: string, callback: (messages: Message[]) => void) => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      callback(messages);
    });
  },

  subscribeToUserChats: (userId: string, callback: (chats: Chat[]) => void) => {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId), orderBy('updatedAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Chat));
      callback(chats);
    });
  }
};

