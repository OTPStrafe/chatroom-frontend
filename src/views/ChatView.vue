<script>

import router from '@/router';
import { useChatStore } from '@/stores/chat';
import { useConnectionStore } from '@/stores/connection';

export default {
  data() {
    return {
      message: '',
    }
  },  
  methods: {
    sendMessage() {
      this.chatStore.sendMessage(this.message);
      this.message = '';
    }
  },
  setup() {
    const chatStore = useChatStore();
    const connectionStore = useConnectionStore();

    if (!connectionStore.isConnected) {
      router.push('/');
    }

    chatStore.bindEvents();
    return { chatStore }
  }
}
</script>

<template>
  <section class="container">
    <div class="wrapper">
      <div class="chat" >
        <div class="message" v-for="(m, index) in chatStore.messages" v-bind:key="index">
          <p>{{ m }}</p>
        </div>
        
        <form @submit.prevent="sendMessage">
          <input type="text" class="textbox" v-model="message">
          <input type="submit" style="display: none;">
        </form>
      </div>
      <div class="users">
        <div class="usercount"><p>{{ chatStore.userCount }}</p></div>
        <div v-for="(u, index) in chatStore.users" v-bind:key="index">
          <p>{{ u }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  gap: 45px;
  background-color: #070F2B;
}

.usercount {
  position: absolute;
  top: -20px;
  left: 190px;
}

p {
  color: white;
}

.message {
  margin-bottom: 5px;
  padding: 5px 10px;
  text-shadow: -1px 0 black, 1px 0 black, 0 1px black, 0 -1px black;
}
.user-message {
  text-align: end;
}

.users {
  position: relative;
  background-color: #535C91;
  height: 650px;
  width: 200px;
}

.chat {
  position: relative;
  background-color: #535C91;
  width: 800px;
  height: 650px;
  overflow-y: scroll;
  text-wrap: pretty;
}

.textbox {
  position: absolute;
  top: 615px;
  width: 500px;
  height: 25px;
}

.wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #1B1A55;
  width: 1000px;
  height: 700px;
}

</style>