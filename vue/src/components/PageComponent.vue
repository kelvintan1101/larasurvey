<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ title }}
      </h1>
      <slot name="header"></slot>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0"><slot></slot></div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>
