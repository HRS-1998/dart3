<template>
  {{ state.content }}
  <dart-tinymce
    v-model="state.content"
    :setting="state.setting"
    :setup="setup"
  />
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
    init_instance_callback: function (editor: any) {
      //强制显示字符数
      editor
        .getContainer()
        .querySelector('button.tox-statusbar__wordcount')
        .click();
    },
  },
});

function setup(editor: any) {
  editor.on('init', function () {
    editor.on('keyup', function (e: any) {
      var content = editor.getContent();
      var maxChars = 20; // 设置最大字符数

      if (content.length > maxChars) {
        //editor.setContent(content.substring(0, maxChars)); // 截断超过最大字符数的部分 不好用
        //触发表单错误验证
        alert('内容已超出最大长度限制！');
      }
    });
  });
}
</script>
