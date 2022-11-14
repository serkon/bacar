<template>
  <bacar-header :user="store.user.current" v-if="store.user.current"></bacar-header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </main>
  <bacar-footer></bacar-footer>
</template>

<script lang="ts">
  import type { AxiosResponse } from 'axios';
  import { defineComponent } from 'vue';

  import BacarFooter from '@/components/footer/footer.component.vue';
  import BacarHeader from '@/components/header/header.component.vue';

  import instance from './components/interceptor/instance';
  import type { User } from './dto/user.dto';
  import { useUserStore } from './stores/user';

  interface Data {
    title: string;
    counter: any;
    store: { user: any };
  }

  export default defineComponent({
    components: {
      BacarHeader,
      BacarFooter,
    },
    data(): Data {
      return {
        title: 'Welcome to Your Vue.js App',
        counter: useUserStore(),
        store: {
          user: useUserStore(),
        },
      };
    },
    created() {
      this.getUser();
    },
    methods: {
      async getUser(): Promise<void> {
        const user = await this.httpGetUser();
        this.store.user.setUser(user);
      },
      async httpGetUser(): Promise<User> {
        const response: AxiosResponse<User> = await instance.get(`${import.meta.env.VITE_API}/user.json`);

        return response.data;
      },
    },
  });
</script>
<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #f5f5f5;

    main {
      display: flex;
      flex-grow: 1;
      padding: 24px;
    }
  }
</style>
