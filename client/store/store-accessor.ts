import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Profile from '~/store/profile'

let profiles: Profile

/**
 * 初始化存储（将其作为类型推断模块）
 * @param store Vuex.Store
 */
function initializeStores (store: Store<any>): void {
    // Todos 存储可以键入推断的模块化
    profiles = getModule(Profile, store)
}

export { initializeStores, profiles }

