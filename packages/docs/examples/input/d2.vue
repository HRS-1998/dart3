<template>
  <dart-input
    v-model="input1"
    input-type="integer"
    placeholder="只允许输入整数"
  ></dart-input>

  <dart-input
    v-model="input2"
    input-type="integer1"
    placeholder="只允许输入正整数"
  ></dart-input>

  <dart-input
    v-model="input3"
    input-type="integer2"
    placeholder="只允许输入负整数"
  ></dart-input>

  <dart-input
    v-model="input4"
    input-type="num"
    placeholder="只允许输入数字"
  ></dart-input>

  <dart-input
    v-model="input5"
    input-type="decmal"
    placeholder="只允许输入浮点数"
  ></dart-input>

  <dart-input
    v-model="input6"
    input-type="decmal1"
    placeholder="只允许输入正浮点数"
  ></dart-input>

  <dart-input
    v-model="input7"
    input-type="decmal2"
    placeholder="只允许输入负浮点数"
  ></dart-input>

  <dart-input
    v-model="input8"
    input-type="letter"
    placeholder="只允许输入英文字母"
  ></dart-input>

  <dart-input
    v-model="input9"
    input-type="letter_u"
    placeholder="只允许输入大写英文字母"
  ></dart-input>

  <dart-input
    v-model="input10"
    input-type="letter_l"
    placeholder="只允许输入小写英文字母"
  ></dart-input>
</template>

<script setup>
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
const input5 = ref('');
const input6 = ref('');
const input7 = ref('');
const input8 = ref('');
const input9 = ref('');
const input10 = ref('');
</script>
