<template>
  <div class="my-scrollbar">
      <template v-for="count in additionalElementsNumber">Additional items dynamically appended {{ count }}<br></template>
      <div class="item">
        Extra element with longer content, and on hover expand,<br> showing that scrollbar is reactive
      </div>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
      Some Content<br/>
  </div>
</template>

<script setup lang="ts">
defineProps({
  additionalElementsNumber: {
    type: Number,
    default: 0
  }
})
</script>
