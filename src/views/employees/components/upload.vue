<template>
  <div>
    <el-upload
      class="upload-demo"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :limit="1"
      :on-preview="onPreview"
      :before-upload="onBeforeUpload"
      :http-request="onHttpRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :class="{
        'img-upload':fileList.length === 1
      }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="isShowPercent" :text-inside="true" :stroke-width="26" :percentage="percentage" />
    <el-dialog :visible="isShow" title="预览图片" width="30%" @close="onClose">
      <img :src="imgUrl" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDFMGzXS8dy63oNlx1xvLZeYGnAJEvSnsj',
  SecretKey: 'hEYL9sPhw9IVsATmxENNBlBPPPRahis0'
})

export default {
  name: 'ImageUpload',
  data() {
    return {
      fileList: [],
      imgUrl: '',
      isShow: false,
      currUid: '',
      percentage: 0,
      isShowPercent: false
    }
  },
  methods: {
    onPreview(file) {
      this.imgUrl = file.url
      this.isShow = true
    },
    onClose() {
      this.imgUrl = ''
      this.isShow = false
    },
    onChange(file, fileList) {
      if (fileList) {
        this.fileList = fileList.map(item => item)
      }
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onBeforeUpload({ type, size, uid }) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      const maxSize = 5 * 1024 * 1024
      if (!types.includes(type)) {
        this.$message.warning('上传图片格式不正确')
        return Promise.reject('失败')
      }
      if (size > maxSize) {
        this.$message.warning('上传图片过大')
        return Promise.reject('失败')
      }
      this.currUid = uid
      return true
    },
    onHttpRequest(params) {
      console.log(params)
      this.isShowPercent = true
      const file = params.file
      console.log(file)
      cos.putObject({
        Bucket: '2624556194-1315219409', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        StorageClass: 'STANDARD',
        onProgress: (progressData) => {
          // console.log(JSON.stringify(progressData))
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        if (!err && data?.statusCode === 200) {
          this.fileList = this.fileList.map(item => {
            if (item.uid === this.currUid) {
              return {
                url: 'https://' + data.Location,
                upload: true
              }
            }
            return item
          })
        }
        setTimeout(() => {
          this.isShowPercent = false
          this.percentage = 0
        }, 1500)
      })
    }
  }
}
</script>

<style>

</style>
