<template>
  <div style="min-height:240px">
    <a-upload
      listType="picture-card"
      :accept="accept"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      @preview="handlePreview"
    >
      <div v-if="isCanUpload">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" :width="600">
      <img style="width: 100%" :src="previewImage"/>
    </a-modal>
  </div>
</template>

<script>
import { AcceptImageAll } from '@/utils/helper/accept.helper'
import apiConfig from '@/config/api.config'
import { uploadFileHttp } from '../../utils/apiRequest'
export default {
  name: 'ImageUpload',
  components: {

  },
  props: {
    /**
     * 初始文件编号数组
     */
    fileCodes: {
      type: Array,
      default: function () {
        return []
      }
    },
    /**
     * 是否只查看
     */
    isOnlyView: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    /** 接受上传的文件类型 比如只能上传图片，可传入"image/*" */
    accept: {
      type: String,
      default: AcceptImageAll
    },
    /** 接受的最大文件大小,默认是2M */
    maxFileSize: {
      type: Number,
      default: 2
    },
    /** 上传文件地址 */
    uploadFileServerUrl: {
      type: String,
      default: apiConfig.file.uploadFile
    },
    /** 下载文件地址 */
    downloadFileServerUrl: {
      type: String,
      default: apiConfig.file.downloadFile
    },
    /** 删除文件地址 */
    removeFileServerUrl: {
      type: String,
      default: apiConfig.file.deleteFile
    }
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      isCanUpload: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      console.log('isOnlyView', this.isOnlyView)
      if (this.isOnlyView) {
        this.isCanUpload = false
      }
      if (this.fileCodes.length > 0) {
        const fileList = []
        this.fileCodes.forEach(fileCode => {
          const fileObject = this.getFileObject(fileCode)
          fileList.push(fileObject)
        })
        this.fileList = fileList
      }
    },
    getFileObject (fileCode) {
      return {
        uid: fileCode,
        name: `${fileCode}.png`,
        status: 'done',
        url: this.downloadFileServerUrl + '/' + fileCode
      }
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      console.log('previewImage', this.previewImage)
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      const serverFileList = fileList.filter(item => item.status === 'done')
      this.fileList = serverFileList
    },
    beforeUpload (file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize > this.maxFileSize) {
        this.$message.error(`最大只能上传${this.maxFileSize}M的文件`)
        console.log('fileList', this.fileList)
        return false
      } else {
        this.handleUpload(file)
      }
      return false
    },
    handleUpload (file) {
      const formData = new FormData()
      formData.append('files[]', file)
      uploadFileHttp({
        url: this.uploadFileServerUrl,
        formData: formData
      }).then(res => {
        if (res && res.length > 0) {
          const result = res[0]
          const fileObject = this.getFileObject(result.FileCode)
          this.fileList.push(fileObject)
        }
      })
    },
    /** 获取上传附件的结果 */
    getFileListResult () {
      const fileCodes = []
      this.fileList.forEach(item => {
        fileCodes.push(item.uid)
      })
      return fileCodes
    }
  }
}
</script>

<style lang="less" scoped>
 .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
