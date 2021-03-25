<template>
  <div class="container">
    <h1>动态路由页面</h1>

    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script lang="ts">
import type { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  layout: "blog",
  asyncData(context: Context) {
    console.log("asyncData" + context.params.id);
  },
})
export default class Dd_id extends Vue {
  private async mounted() {
    console.log("mounted" + this.$route.params.id);
  }
}
</script>

<style scoped lang="less">
@w: 110px;
body {
  width: @w;
}
</style>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style> 