import type { Plugin } from '@nuxt/types'
import Vue from 'vue'
type Truncater = (text: string) => string

//注入到vue实例
declare module 'vue/types/vue' {
  interface Vue {
    $truncate: Truncater
  }
}

//注入到conext
declare module '@nuxt/types' {
  interface Context {
    $truncate: Truncater
  }
}


const truncater: Truncater = (text: string) => text.length > 15 ? text.substring(0, 15) : text

const truncatePlugin: Plugin = (_context, inject) => {
 
    inject('truncate', truncater)
}

export default truncatePlugin
