<template>
  <div class="header">
    <div class="container">
      <div class="row">
        <div class="col-1">
          <img src="./logo.png" alt="Logo" class="logo" />
        </div>
        <div class="d-flex align-items-center justify-content-center col-9">
          <nav>
            <!--
            <RouterLink to="/" class="px-2">Home</RouterLink>
            <RouterLink to="/about" class="px-2">Netice</RouterLink>
            -->
          </nav>
        </div>
        <div class="d-flex align-items-center justify-content-end col-2" v-if="user">
          <div :class="[user.status ? 'online' : 'offline', 'status']"></div>
          <div class="name">{{ `${user.surname} ${user.name[0]}.` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { type PropType, defineComponent } from 'vue';

  import type { User } from '@/dto/user.dto';

  export default defineComponent({
    name: 'bacar-header',
    props: {
      user: {
        type: Object as PropType<User>,
        required: true,
      },
    },
  });
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    background-color: #ffffff;

    img.logo {
      height: 40px;
    }

    .status {
      margin-right: 7px;
      width: 12px;
      height: 12px;
      border-radius: 50%;

      &.online {
        background-color: #19cc95;
      }

      &.offline {
        background-color: red;
      }
    }

    .name {
      color: #253858;
      font-weight: 600;
    }
  }
</style>
