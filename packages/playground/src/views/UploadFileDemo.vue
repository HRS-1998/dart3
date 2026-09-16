<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px">
    <div>
      <h3>默认用法（mock 上传接口）</h3>
      <dart-upload-file v-model="url" :http-request="mockUpload" />
      <p>当前文件地址：{{ url || '无' }}</p>
    </div>

    <div>
      <h3>自定义按钮文案与大小限制（2MB）</h3>
      <dart-upload-file
        v-model="url2"
        btn-name="上传附件"
        :max-size="2 * 1024"
        accept=".zip,.txt"
        :http-request="mockUpload"
      />
      <p>当前文件地址：{{ url2 || '无' }}</p>
    </div>

    <div>
      <h3>上传失败路径（mock 返回 code: 1）</h3>
      <dart-upload-file v-model="url3" :http-request="mockUploadFail" />
      <p>当前文件地址：{{ url3 || '无' }}（预期：提示“上传失败”，文件列表被清空）</p>
    </div>

    <div>
      <h3>初始值回显（url 预设）</h3>
      <dart-upload-file v-model="url4" :http-request="mockUpload" />
      <p>当前文件地址：{{ url4 || '无' }}（预期：直接回显文件名“初始附件.zip”）</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const url = ref('');
const url2 = ref('');
const url3 = ref('');
const url4 = ref('https://mock.example.com/files/初始附件.zip');

const mockUpload = (opt: any) => {
  // 触发进度事件，使 loading 态可测
  opt.onProgress({} as any, {} as any);
  setTimeout(() => {
    opt.onSuccess({
      code: 0,
      data: `https://mock.example.com/files/${encodeURIComponent(opt.file.name)}`,
    });
  }, 800);
};

const mockUploadFail = (opt: any) => {
  opt.onProgress({} as any, {} as any);
  setTimeout(() => {
    opt.onSuccess({
      code: 1,
      message: '上传失败',
    });
  }, 800);
};
</script>
