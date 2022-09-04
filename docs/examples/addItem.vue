<template>
  <button class="add-item" @click="onClickButton">Add Dynamically item</button>
</template>

<script setup>
const props = defineProps({
  instance: {
    type: Object,
    default: undefined
  }
});

let count = 0;
const onClickButton = () => {
  if(!props.instance) return;
  count += 1;
  const element = document.createTextNode(`Additional items dynamically appended ${count}`);
  const br = document.createElement('br');

  props.instance.prepend(element, br);
}
</script>
