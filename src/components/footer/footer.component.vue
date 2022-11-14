<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'bacar-footer',
  });
</script>
<template>
  <footer class="footer">
    <div class="container">Created by <a href="https://prosperium.co.uk/">Prosper</a></div>
  </footer>
</template>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding-bottom: 16px;
    height: 190px;
    background: #2c7ef9;

    .container {
      display: flex;
      justify-content: flex-end;
      color: #bad6ff;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;

      a {
        padding-left: 3px;
        color: #bad6ff;
        text-decoration: underline;
      }
    }
  }
</style>
