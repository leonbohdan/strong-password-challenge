<script setup>
import { computed, ref } from 'vue';
import { RULE_CONFIG } from '@/domain/password/rules';
import { StrengthOption, StrengthOptionLabel } from '@/domain/password/strength-options';

const rules = {
  isOneLetter: (v) => {
    const hasOneLetter = v.length > 0;
    setOrDeleteRule(hasOneLetter, RULE_CONFIG.OneLetter);
    return hasOneLetter;
  },
  isUpperAndLower: (v) => {
    const pattern = /(?=.*[a-z])(?=.*[A-Z])/g;
    const hasUpperAndLower = pattern.test(v);
    setOrDeleteRule(hasUpperAndLower, RULE_CONFIG.UpperAndLower);
    return hasUpperAndLower;
  },
  isOneNumber: (v) => {
    const pattern = /\d+/;
    const hasOneNumber = pattern.test(v);
    setOrDeleteRule(hasOneNumber, RULE_CONFIG.OneNumber);
    return hasOneNumber;
  },
  isOneSpecialSymbol: (v) => {
    const pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const hasOneSpecialSymbol = pattern.test(v);
    setOrDeleteRule(hasOneSpecialSymbol, RULE_CONFIG.SpecialSymbol);
    return hasOneSpecialSymbol;
  },
  isLongerThan: (v, n) => {
    const isLonger = v.length > n;
    setOrDeleteRule(isLonger, RULE_CONFIG[`LongerThan${n}`]);
    return isLonger;
  }
};

const setOrDeleteRule = (condition, ruleName) => {
  condition
    ? totalValidRules.value.set(ruleName, ruleName)
    : totalValidRules.value.delete(ruleName);
};

const ruleItems = [
  {
    name: RULE_CONFIG.OneLetter,
    description: 'Has at least one letter',
    isValid: (v) => rules.isOneLetter(v)
  },
  {
    name: RULE_CONFIG.UpperAndLower,
    description: 'Has at least one lower and one upper case letter',
    isValid: (v) => rules.isUpperAndLower(v)
  },
  {
    name: RULE_CONFIG.OneNumber,
    description: 'Has at least one number',
    isValid: (v) => rules.isOneNumber(v)
  },
  {
    name: RULE_CONFIG.SpecialSymbol,
    description: 'Has at least one special character',
    isValid: (v) => rules.isOneSpecialSymbol(v)
  },
  {
    name: RULE_CONFIG.LongerThan4,
    description: 'Has length > 4',
    isValid: (v) => rules.isLongerThan(v, 4)
  },
  {
    name: RULE_CONFIG.LongerThan8,
    description: 'Has length > 8',
    isValid: (v) => rules.isLongerThan(v, 8)
  },
  {
    name: RULE_CONFIG.LongerThan12,
    description: 'Has length > 12',
    isValid: (v) => rules.isLongerThan(v, 12)
  }
];

const password = ref('');
const isShowPassword = ref(false);
const totalValidRules = ref(new Map());

const hintMessage = computed(() => {
  const is5OrMoreValidRules = totalValidRules.value.size >= 5;

  return is5OrMoreValidRules
    ? StrengthOptionLabel[StrengthOption.Strong]
    : StrengthOptionLabel[StrengthOption.Weak];
});
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
          <button type="button" @click="isShowPassword = !isShowPassword" class="p-1 mr-1">
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
        :class="[
          'px-0',
          rule.isValid(password) ? 'valid' : 'not-valid',
          `password-hint__rule--${rule.isValid(password) ? 'pass' : 'fail'}`
        ]"
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
