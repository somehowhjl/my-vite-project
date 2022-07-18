import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router'
import './index.css'
import {
  create,
  NButton,
  NConfigProvider,
  NFormItem,
  NSwitch,
  NForm,
  NInput,
  NDatePicker,
  NSelect,
  NIcon,
  NMessageProvider,
} from 'naive-ui'

const naive = create({
  components: [NButton, NConfigProvider, NFormItem, NSwitch, NForm, NDatePicker, NInput, NSelect, NIcon, NMessageProvider,]
})

const app =createApp(App)
 // 挂载pinia,router
app.use(store).use(router).use(naive)
// 挂载实例
app.mount('#app')