import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/manager';
import { setToken, clearToken } from '@/utils/auth';
import { Manager } from '@/types/global';
import { useRouter } from 'vue-router';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): Manager => ({
    id: undefined,
    username: undefined,
    password: undefined,
    phone: undefined,
    mailbox: undefined,
    role: undefined,
    orgId: undefined,
    orgName: undefined
  }),

  getters: {
    userInfo(state: Manager): Manager {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {

      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      // await userLogout();
      this.resetInfo();
      clearToken();
      window.location.href = '/#/login?redirect=dashboard';
    },
  },
});

export default useUserStore;
