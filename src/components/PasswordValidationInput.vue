<script setup>
import { usePasswordValidation } from '@/composables/usePasswordValidation.js';

const { password, isShowPassword, hintMessage, ruleItems } = usePasswordValidation();
</script>

<template>
  <div class="mt-3 md:mx-auto md:w-1/2 lg:w-1/2 xl:w-1/3">
    <div>
      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
        Password
      </label>

      <div class="relative mt-2 rounded-md shadow-sm">
        <input
          v-model="password"
          data-test="password-field"
          :type="isShowPassword ? 'text' : 'password'"
          name="password"
          id="password"
          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Password"
        />

        <div class="absolute inset-y-0 right-0 flex items-center">
          <button type="button" class="p-1 mr-1" @click="isShowPassword = !isShowPassword">
            <i :class="['mdi', isShowPassword ? 'mdi-eye' : 'mdi-eye-off']"></i>
          </button>
        </div>
      </div>
    </div>

    <div data-test="validation-summary" class="mt-2 ml-3">{{ hintMessage }}</div>

    <ul class="mt-3">
      <li
        v-for="rule in ruleItems"
        :key="rule.name"
        :data-test-rule-indicator="rule.name"
        :class="['px-0', `password-hint__rule--${rule.isValid(password) ? 'pass' : 'fail'}`]"
      >
        {{ rule.description }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="sass">
.password-hint__rule
  &--pass
    color: rgb(76,175,80)

  &--fail
    color: rgb(176,0,32)
</style>
