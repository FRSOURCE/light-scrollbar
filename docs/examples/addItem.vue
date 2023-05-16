<template>
  <button class="add-item" @click="$emit('click', 1)">Add Dynamically item</button>
  <button class="add-item" @click="$emit('click', 100)">Add Dynamically 100 items</button>
</template>
