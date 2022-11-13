<template>
  <bacar-header :user="user"></bacar-header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import BacarHeader from '@/components/header/header.component.vue';

  import type { User } from './dto/user.dto';
  import { useCounterStore } from './stores/counter';

  interface Data {
    title: string;
    counter: any;
    user: User | null;
  }

  export default defineComponent({
    components: {
      BacarHeader,
    },
    data(): Data {
      return {
        title: 'Welcome to Your Vue.js App',
        counter: useCounterStore(),
        user: null,
      };
    },
    created() {
      this.user = this.getUser();
    },
    methods: {
      getUser(): User {
        return { id: '123', name: 'Serkan', surname: 'Konakcı', status: true };
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
      padding: 24px;
    }
  }
</style>
