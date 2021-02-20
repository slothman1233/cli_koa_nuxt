<template>
  <section>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
      <Card v-for="person in people" :key="person.id" :person="person"></Card>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'
import type { Person } from '~/models'
import Card from '~/components/Card.vue'
// 导入列表存储模块
import { profiles } from '~/store'
import type { Context } from '@nuxt/types'
@Component({
  components: {
    Card,
  },
  asyncData(context) {
    return {
      people: profiles.people,
    }
  },
})
export default class extends Vue {
  private people!: Person[]

  private async mounted(context: Context) {
    console.log('mounted')
    console.log(this.people)
  }
}
</script>

<style scoped>
.header {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
