import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/getUser',
        method: 'post',
        response: () => {
            return {
                code: 0,
                message: 'ok',
                data: ['aa', 'bb']
            }
        }
    }
] as MockMethod[]