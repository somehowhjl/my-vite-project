import { http } from '@/axios/index'

export const landList = (data: any) => {
    return http({
      url:'/getUser',
      data,
      method: 'post'
    })
}
