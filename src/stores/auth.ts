import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

import type FUser from "@/types/FUser";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    me: null as FUser | null,
    idToken: "" as string,
  }),
  getters: {
    authenticated: (state) => state.me?.uid,
    verified: (state) => state.me?.emailVerified,
  },
  actions: {
    loginByEmail(email: string, password: string) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(getAuth(), email, password)
          .then(() => {
            this.me = getAuth().currentUser;
            resolve(this.me);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginByGoogle() {
      return new Promise((resolve, reject) => {
        signInWithPopup(getAuth(), new GoogleAuthProvider())
          .then(() => {
            this.me = getAuth().currentUser;
            resolve(this.me);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginByApple() {
      return new Promise((resolve, reject) => {
        signInWithPopup(getAuth(), new OAuthProvider("apple.com"))
          .then(() => {
            this.me = getAuth().currentUser;
            resolve(this.me);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    authenticate() {
      return new Promise((resolve, reject) => {
        getAuth().onAuthStateChanged((user) => {
          if (user) {
            this.me = user;
            resolve(user);
          } else {
            reject();
          }
        });
      });
    },
    logout() {
      return getAuth().signOut();
    },
  },
});
