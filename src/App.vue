<script setup>
import BaseHeader from '@/components/BaseHeader.vue';
import PasswordValidationInput from '@/components/PasswordValidationInput.vue';
</script>

<template>
  <BaseHeader />

  <main class="md:container md:mx-auto px-4 md:px-0 pb-4 md:pb-0 relative z-10">
    <PasswordValidationInput />
  </main>
</template>
