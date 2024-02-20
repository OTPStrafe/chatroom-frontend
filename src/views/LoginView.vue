<script>
import { useConnectionStore } from '@/stores/connection';
import { socket } from '@/socket';
import router from '@/router';
import { useChatStore } from '@/stores/chat';

export default {
  data() {
    return {
      username: '',
      error: null,
    }
  },
  methods: {
    login() {
      this.connectionStore.connect();
      socket.emit('add user', this.username, (data) => {
        if (data.error) {
          this.error = true;
        } else {

          this.chatStore.userCount = data.online;
          this.chatStore.users = data.users;

          this.$router.push('/chat');
        }
      });
    }
  },
  setup() {
    const connectionStore = useConnectionStore();
    const chatStore = useChatStore();
    if (connectionStore.isConnected) {
      router.push('/chat');
    }
    return { connectionStore, chatStore };
  }
}
</script>

<template>
  <section class="container">
    <h1>Rich's Chatroom</h1>
    <form @submit.prevent="login" class="loginForm">
      <input type="text" id="username" v-model="username" placeholder="Username">
      <button type="submit" class="btn">Enter</button>
    </form>
  </section>
</template>


<style scoped>

.btn {
  width: 50px;
  border-radius: 5px;
  height: 50px;
  background-color: transparent;
}

.btn:hover {
  cursor: pointer;
}

.loginForm {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 10px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  gap: 45px;
}
</style>