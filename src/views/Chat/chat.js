import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image , ScrollView} from 'react-native';
import {chatData} from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const ChatRoom = ({ route }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid)
                // console.log(user)
            } else {
            }
        });
    }, []);
    const { chatPerson, name } = route.params;
    const chatPersonId = chatPerson.id
    const chatPersonName = name[0].name
    
console.log("chatPerson", name[0].name)
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    // Handle sending the message
    console.log('Message sent:', message);
    setMessage('');
    const chatDataRes = await chatData(chatPersonName,message,chatPersonId,user)
  };
// geting all chats of this room
const [chatMessages, setChatMessages] = useState([]);
useEffect(() => {
    const chatCollectionRef = collection(db, "chat");
    const chatQuery = query(chatCollectionRef);
  
    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setChatMessages(messages);
    });
  
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  const filterChats = chatMessages
  .filter((chat) => {
    const isCurrentUser = chat.id === user;
    const isChatPerson =
      (chat.id === user && chat.personId === chatPersonId) ||
      (chat.id === chatPersonId && chat.personId === user);

    return isChatPerson;
  })
  .sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return a.timestamp.toDate() - b.timestamp.toDate();
    }
    return 0;
  });


  
  
  
  

console.log("filterChats",filterChats)




  return (
    <View style={styles.container}>
        <View style={styles.containerTwo}>
      <Image source={{ uri: chatPerson.image[0] }} style={styles.profilePic} />
      <Text style={styles.profileName}>{chatPerson.name}</Text>
    </View>
      <ScrollView>
      <View style={styles.chatList}>
        {/* Message bubbles */}
       {filterChats.map((item) => {
        return  <View style={item.id==user?styles.received:styles.messageBubble}>
        <Text style={styles.sender}>{item.id==user?"you":item.sender}</Text>
        <Text style={styles.message}>{item.chat}</Text>
      </View>
       })}
    
        {/* Add more message bubbles here */}
      </View>
      </ScrollView>
      {/* <View style={[styles.messageBubble, styles.received]}>
          <Text style={styles.sender}>Mia</Text>
          <Text style={styles.message}>I'm fine, thanks!</Text>
        </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    backgroundColor: 'black',
  },
  chatList: {
    flex: 1,
    padding: 16,
    marginTop:40
  },
  messageBubble: {
    alignSelf: 'flex-start',
    maxWidth: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  received: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',

  },
  sender: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#888888',
  },
  message: {
    fontSize: 14,
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  containerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075e54',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#128c7e',
    paddingTop:35
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatRoom;
