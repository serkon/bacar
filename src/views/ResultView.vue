<template>
  <div class="actions">
    <router-link to="/" v-slot="{ href, navigate }" class="text-decoration-none w-auto d-inline-block">
      <button :href="href" @click="navigate" class="no-background">
        <img src="@/assets/images/Triangle.svg" class="icon-left" /><span>Geri</span>
        <!--{{ // route.name }}-->
      </button>
    </router-link>
  </div>
  <div class="result"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ResultView',
  });
</script>

<style>
  @media (min-width: 1024px) {
    .about {
      display: flex;
      align-items: center;
      min-height: 100vh;
    }
  }
</style>
