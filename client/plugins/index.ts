import { Context, Plugin } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

declare module '@nuxt/types' {
  interface Context {
    $myInjectedFunction (message: string): void
  }
}

const myPlugin: Plugin = (context: Context, inject: Inject) => {
    const myInjectedFunction = (message: string) => console.log(message)
    inject('myInjectedFunction', myInjectedFunction)
}

export default myPlugin
