import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 注册i18n实例并引入语言文件，文件格式等下解析
import zh_CN from '@/language/zh_CN'
import en from '@/language/en'
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    zh_CN,
    en,
  }
})
export default i18n
