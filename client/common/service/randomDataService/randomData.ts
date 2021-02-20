
// import env from '../../config/env'
// import http from '../http'
import service from '../https'

// export const test = () =>
//     http.get({
//         url: '../../assets/json/random-data.json'
//     })

export const getrandom = () =>
    service.get<any>('/json/random-data.json').then((response) => {
        return response?.bodyMessage
    }).catch((e: any) => {
        console.log(e)
    })
