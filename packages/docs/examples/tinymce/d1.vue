<template>
  {{ state.content }}
  <dart-tinymce v-model="state.content" :setting="state.setting" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const state = reactive({
  content: 'hello vue3-tinymce!',
  // editor 配置项
  setting: {
    height: 400, // editor 高度
    plugins:
      'advlist anchor  autosave code codesample directionality emoticons fullscreen  image  importcss ' +
      ' insertdatetime  link autolink lists media nonbreaking pagebreak  preview  save searchreplace' +
      ' table   visualblocks visualchars wordcount charmap help',
    toolbar: [
      `code undo redo | cut copy paste | forecolor backcolor bold italic underline strikethrough link | alignleft  aligncenter  alignright alignjustify outdent indent |  `,
      ` styleselect blocks  fontfamily fontsize | bullist numlist | blockquote subscript superscript removeformat |  `,
      ' table image media  hr pagebreak  insertdatetime print   preview anchor | fullscreen  | charmap wordcount restoredraft help',
    ],
    images_upload_url: '',
    images_upload_base_path: '',
    // images_upload_handler: async (blobInfo: any) => {
    //   return new Promise((resolve, reject) => {
    //     const formData = new FormData();
    //     formData.append('file', blobInfo.blob());
    //     apiUpload(formData).then((res: any) => {
    //       const { Code, Data } = res;
    //       if (Code) {
    //         reject('上传失败');
    //         return;
    //       }
    //       resolve(Data);
    //     });
    //   });
    // },
  },
});
</script>
