import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { User } from '@/dto/user.dto';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null);

  function setUser(user: User): void {
    currentUser.value = user;
  }

  return { current: currentUser, setUser };
});
