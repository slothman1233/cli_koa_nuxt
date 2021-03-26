<template>
  <div class="container">
    <h1>Hello World!</h1>
    <p>{{ message | format }}</p>
    <p>
      <button @click="sss">{{ title }}</button>

      <nuxt-link to="/">{{ userAgent }}</nuxt-link>
    </p>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
  <img src="/assets/images/11.png" />
    <card v-if="person" :person="person" :title="title" />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  State,
  Vue,
  Watch,
  Action,
  Getter,
} from "nuxt-property-decorator";
import { Person, RootState } from "~/models";
import Card from "../components/Card.vue";
import { MetaInfo } from "vue-meta";
// 导入列表存储模块
import { profiles } from "~/store";
import type { Context } from "@nuxt/types";
import { getrandom } from "../common/service/randomDataService/randomData";

@Component({
  middleware: ["index"],

  components: {
    Card,
  },

  layout: "blog",

  filters: {
    format: function (val: string): string {
      return val + "　filtered";
    },
  },

  asyncData(context) {
    console.log(66666666666666, context.$truncate("g44g"));
    console.log("asyncData");
    profiles.setTest("525");
    console.log(1111, context.userAgent);
    return {
      userAgent: context.userAgent,
    };
  },

  //fetch方法用于在呈现页面之前填充存储
  //https://www.nuxtjs.cn/api/pages-fetch
  fetch(this: Hello) {
    // debugger;
    // console.log("fetch:" + app, typeof app);
    // return fetch("https://jsonplaceholder.typicode.com/todos")
    //   .then((response) => response.json())
    //   .then((data: ToDo[]) => {
    //     this.fetchedTodos = data;
    //   });
  },

  //为这个页面设置Meta标签
  //https://www.nuxtjs.cn/api/pages-head
  head(this: Hello): MetaInfo {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom des4cription333",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto",
        },
      ],
    };
  },
})
export default class Hello extends Vue {
  private message: string = "123123123123";
  private person: any = null;
  private userAgent: any = null;

  @Prop({ default: "default" }) title!: string;

  private created() {
    this.message = "sgg";
  }

  private async mounted() {
    console.log(66666666666666, this.$truncate("gg"));
    console.log(777777777777777, profiles.people);
    // console.log(this.userAgent);
    const people = await getrandom();
    const ramdomPerson: Person =
      people[Math.floor(Math.random() * people.length)];
    // this.message = `こんにちは、${ramdomPerson.first_name} さん。いつもありがとうございます！`

    this.person = ramdomPerson;
  }

  @Watch("message")
  onMessageChanged(val: string, olcVal: string) {
    console.log("message changed", val, olcVal);
  }

  @Watch("person", { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) {
    console.log("person is changed to " + (val && val.first_name));
  }
  private sss() {
    this.message = this.message.split("").reverse().join("");
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style> 