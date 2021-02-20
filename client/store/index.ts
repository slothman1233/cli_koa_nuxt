import { Store } from 'vuex'
import { initializeStores } from '~/store/store-accessor'
import * as storeaccessor from '~/store/store-accessor'

const initializer = (store: Store<any>) => initializeStores(store)

export const plugins = [initializer]

export const actions = {
  //初始化执行
  async nuxtServerInit(store: any, context: any) {
    // do it once more like so.. 
    // initializeStores(context.store);
    // storeaccessor.forEach((v: any) => {

    // });


    for (let i in storeaccessor) {

      if (i === "initializeStores") {
        storeaccessor[i](context.store);
        continue;
      }
      let fun = storeaccessor[i]['nuxtServerInit']
      fun && fun(store, context)

    }
  }
}

export * from '~/store/store-accessor'
