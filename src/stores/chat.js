import { defineStore } from 'pinia'
import { socket } from '@/socket'

export const useChatStore = defineStore('chat', {
  state: () => ({
    userCount: 0,
    messages: [],
    users: [],
  }),
  actions: {
    bindEvents() {
      const that = this;
      
      socket.on('chat message', function(message) {
        that.messages.push(message);
      })

      socket.on('user connected', function({ username, connections}) {
        that.users.push(username);
        that.userCount = connections;
      })

      socket.on('user disconnected', function({ username, connections }) {
        that.userCount = connections;
        that.users.splice(that.users.indexOf(username, 1));
      })
    },
    sendMessage(message) {
      if (message.trim().length === 0) return;
      socket.emit('chat message', message);
    }
  }
})
