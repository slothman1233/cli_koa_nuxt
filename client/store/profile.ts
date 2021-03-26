
import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import Vuex from 'vuex'
import { RootState, Person } from '~/models'
import localRandomData from '~/static/assets/json/random-data.json'

@Module({ namespaced: true, stateFactory: true, name: 'profile' })
export default class Profile extends VuexModule {
    // 相当于 state
    people: Person[] = []
    test = '2'



    // 相当于 getters
    fullName(state: RootState): string {
        const { people } = state
        const firstName = people[0].first_name || ''
        const lastName = people[0].last_name || ''
        return `${firstName} ${lastName}`
    }

    @Mutation
    setPeople(people: Person[]): void {
        this.people = people
    }

    @Mutation
    setTest(val: string): void {
        this.test = val
    }



    // eslint-disable-next-line
    @MutationAction
    async updatePosts() {
        console.log(123)
        return { test: 'f' }
    }


    @Mutation
    nuxtServerInit(store: any, context: any) {
        let people: Person[] = []
        people = localRandomData.bodyMessage
        store.getters['vuexModuleDecorators/profile'].setPeople(people.slice(0, 10))
    }
}
