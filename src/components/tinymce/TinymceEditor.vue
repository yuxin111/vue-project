<template>
  <div class="tinymce-editor">
    <Editor
      id="tinymce"
      v-model="value"
      :init="initConfig"
    >Init text
    </Editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import api from '@/api'
//  添加配置
import 'tinymce/icons/default/icons.min'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/paste'
// import 'tinymce/plugins/media'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: '',
      initConfig: {
        min_height: 400,
        // 中文语言包路径
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        // 配置
        plugins: 'fullscreen link code table lists wordcount image paste',
        toolbar: [
          'formatselect fontselect fontsizeselect | bold italic forecolor backcolor lists table removeformat image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen'
        ],
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        branding: false, //  是否禁用 “Power by Tinymce”
        // menubar: false, // 菜单栏显示(默认为true)
        elementpath: false,
        // 上传图片
        paste_data_images: true, // 允许直接黏贴图片
        // TODO 图片大小、类型设置等
        images_file_types: 'jpeg,jpg,png',
        images_upload_handler: function (blobInfo, success, failure) {
          const formdata = new FormData()
          formdata.append('files', blobInfo.blob())
          api.article.uploadImage(formdata).then(res => {
            success(process.env.VUE_APP_BASE_URL + res)
          }).catch(() => {
            console.log('上传出错')
            failure('上传出错', { remove: true })
          })
        }
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  watch: {
    value (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
.tinymce-editor {
  width: 100%;
}

.tox-tinymce-aux {
  z-index: 5000 !important;
}
</style>
