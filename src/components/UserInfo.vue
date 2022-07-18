<template>
  <div class="tw-bg-green-400 tw-w-[100px] tw-h-[40px] tx-text-5xl">{{ userStore.name }}</div>
  <n-form
    ref="formRef"
    :model="userForm"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    size="small"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="Input" path="inputValue">
      <n-input v-model:value="userForm.username" placeholder="Input" />
    </n-form-item>
    <n-form-item label="Textarea" path="textareaValue">
      <n-input
        v-model:value="userForm.desc"
        placeholder="Textarea"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
    <n-form-item label="school" path="school">
      <n-select
        v-model:value="userForm.school"
        placeholder="Select"
        :options="schoolOptions"
      />
    </n-form-item>
    <n-form-item label="Multiple Select" path="multipleSelectValue">
      <n-select
        v-model:value="userForm.hobby"
        placeholder="Select"
        :options="hobbyOptions"
        :render-label="renderHobbyLabel"
        multiple
      />
    </n-form-item>
    <n-form-item label="Datetime" path="datetimeValue">
      <n-date-picker v-model:value="userForm.bothDate" type="datetime" />
    </n-form-item>
    <n-form-item label="sex" path="sex">
      <n-switch v-model:value="userForm.sex" />
    </n-form-item>
  </n-form>
  <n-button @click="run" :loading="loading">提交</n-button>
  <div class="tw-mb-5">
    <p class="text1 tw-my-2">追逐光明，我们会被灼烧的。</p>
    <span class="text2 tw-py-1">风虽大，却都绕过我的灵魂</span>
  </div>
</template>

<script lang="tsx" setup>
import { useUserStore } from '@/store/user'
import { SelectOption, SelectGroupOption, useMessage } from 'naive-ui'
import { UserForm } from '@/use/use'
import { useRequest } from 'v3hooks';
import { landList } from '@/api/api'
import { reactive, computed, getCurrentInstance  } from 'vue'
import { ApertureOutline } from '@vicons/ionicons5'
const message = useMessage()
const rules = {
  sex: [{
    require: true,
    message: '1111',
    trigger: 'change'
  }]
}

const schoolOptions = [
  {
    label: 'Everybodys Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true,
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
]
const hobbyOptions = [
  {
    label: 'Everybodys Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  },
  {
    label: "You Won't See",
    value: 'song3',
    disabled: true
  },
]
const userForm = reactive<UserForm>({
  username: '',
  desc: '',
  sex: 0,
  hobby: null,
  bothDate: null,
  school: null,
})
const renderHobbyLabel = (option: SelectOption) => {
  return (
    <div>
      <n-icon size="12"><ApertureOutline/></n-icon>
      <span class="tw-text-pink-400">{ option.label }</span>
    </div>
  )
}
const { run, loading, data } = useRequest(() => landList(userForm), {
  manual: true,
  onSuccess: (data) => {
    userForm.username = data.data[1]
    console.log(data, 111)
  },
  onError: () => message.error('获取数据失败')
})

const userStore = useUserStore()
userStore.updateName('李四')
</script>

<style scoped lang="postcss" type="text/postcss">
  .text1 {
    background: linear-gradient(90deg, #ABDCFF, #0396FF);
    /* clip-path: ellipse(50% 32% at 50% 51%); */
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    background-clip: text;
    -webkit-text-stroke:rgba(79, 79, 224,.7) 2px;
    font-size: 30px;
    background-position: 0 0;
    letter-spacing: 2px;
    color: transparent;
    background-size: 10px 100%;
    background-repeat: no-repeat;
    transition: 2s background-size linear;
    &:hover {
      background-size: 100% 100%;
    }
  }
  .text2 {
    background: linear-gradient(90deg, #0cc 50%, #ccc 100%);
    -webkit-text-stroke:rgba(79, 79, 224,.7) 2px;
    font-size: 30px;
    background-position: 0 100%;
    letter-spacing: 2px;
    background-size: 0 5px;
    background-repeat: no-repeat;
    transition: 2s background-size linear;
    &:hover {
      background-size: 100% 5px;
    }
  }
</style>