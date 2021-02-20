<template>
  <div class="card">
    <h2></h2>
    <img :src="'https://robohash.org/' + person.gender + '_' + title" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import type { Person } from "~/models";

@Component({})
export default class Card extends Vue {
  @Prop() person!: Person;
  @Prop() title!: any;
}
</script>

<style scoped>
.card {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
  margin: 0.25rem;
  border: 0.25rem solid gainsboro;
}
</style>
