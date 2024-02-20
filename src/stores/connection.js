import { socket } from "@/socket";
import { defineStore } from "pinia";

export const useConnectionStore = defineStore("connection", {
  state: function() {
    return {
      isConnected: false,
    }
  },
  actions: {
    bindEvents() {
      socket.on("connect", () => {
        this.isConnected = true;
      });

      socket.on("disconnect", () => {
        this.isConnected = false;
      });
    },
    connect() {
      if (this.isConnected) return;
      socket.connect();
    }
  }
})