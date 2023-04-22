<script setup>
import { ref } from 'vue';
import { RULE } from '@/domain/password/rules';

const rules = Object.values(RULE);

const password = ref('');
</script>

<template>
  <div>
    <input data-test="password-field" v-model="password" />

    <ul>
      <li
        v-for="rule in rules"
        :key="rule"
        :data-test-rule-indicator="rule"
        :class="'password-hint__rule password-hint__rule--fail'"
      >
        {{ rule }}
      </li>
    </ul>

    <span data-test="validation-summary">Strong or Weak?</span>
  </div>
</template>

<style scoped></style>
