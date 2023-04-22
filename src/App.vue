<script setup>
import { computed, ref } from 'vue';
// import { RULE } from '@/domain/password/rules';
import { StrengthOption, StrengthOptionLabel } from '@/domain/password/strength-options';

// const rules = Object.values(RULE);

const rules = {
  // isOneLetter: (v) => v.length > 0 || 'Must be at least one letter',
  // isUpperAndLower: (v) => v.length >= 1 || 'Must be at least one lower and one upper case letter',
  // isOneNumber: (v) => v.length >= 1 || 'Must be at least one number',
  // isOneSpecialSymbol: (v) => v.length >= 1 || 'Must be at least one special character',
  isOneLetter: (v) => {
    v.length > 0
      ? totalValidRules.value.set('OneLetter', 'OneLetter')
      : totalValidRules.value.delete('OneLetter');

    return v.length > 0;
  },
  isUpperAndLower: (v) => {
    const pattern = /(?=.*[a-z])(?=.*[A-Z])/g;

    return pattern.test(v);
  },
  isOneNumber: (v) => {
    const pattern = /\d+/g;

    return pattern.test(v);
  },
  isOneSpecialSymbol: (v) => {
    const pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    return pattern.test(v);
  },
  isLongerThan4: (v) => v.length > 4,
  isLongerThan8: (v) => v.length > 8,
  isLongerThan12: (v) => v.length > 12
};

const ruleItems = [
  {
    name: 'Has at least one letter',
    isValid: (v) => rules.isOneLetter(v)
  },
  {
    name: 'Has at least one lower and one upper case letter',
    isValid: (v) => rules.isUpperAndLower(v)
  },
  {
    name: 'Has at least one number',
    isValid: (v) => rules.isOneNumber(v)
  },
  {
    name: 'Has at least one special character',
    isValid: (v) => rules.isOneSpecialSymbol(v)
  },
  {
    name: 'Has length > 4',
    isValid: (v) => rules.isLongerThan4(v)
  },
  {
    name: 'Has length > 8',
    isValid: (v) => rules.isLongerThan8(v)
  },
  {
    name: 'Has length > 12',
    isValid: (v) => rules.isLongerThan12(v)
  }
];

const password = ref('');
const isShowPassword = ref(false);
const totalValidRules = ref(new Map());

const hintMessage = computed(() => {
  // const rules = ruleItems.map((isValid) => isValid);
  //
  // console.log('rules', rules);

  return StrengthOptionLabel[StrengthOption.Strong];
});
</script>

<template>
  <!--  <div>-->
  <!--    <input data-test="password-field" v-model="password" />-->

  <!--    <ul>-->
  <!--      <li-->
  <!--        v-for="rule in rules"-->
  <!--        :key="rule"-->
  <!--        :data-test-rule-indicator="rule"-->
  <!--        :class="'password-hint__rule password-hint__rule&#45;&#45;fail'"-->
  <!--      >-->
  <!--        {{ rule }}-->
  <!--      </li>-->
  <!--    </ul>-->

  <!--    <span data-test="validation-summary">Strong or Weak?</span>-->
  <!--  </div>-->

  <v-card elevation="0">
    <v-layout>
      <v-app-bar color="primary">
        <v-container>
          <span class="text-h5">Strong password challenge</span>
        </v-container>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-text-field
            v-model="password"
            clearable
            label="Password"
            variant="outlined"
            :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.isOneLetter]"
            :type="isShowPassword ? 'text' : 'password'"
            :hint="hintMessage"
            persistent-hint
            counter
            @click:append="isShowPassword = !isShowPassword"
          />

          <v-list>
            <v-list-item
              v-for="item in ruleItems"
              :key="item.name"
              :class="['px-0', item.isValid(password) ? 'valid' : 'not-valid']"
              :title="item.name"
            />
          </v-list>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped lang="sass">
:deep(.valid)
  color: rgb(76,175,80)

:deep(.not-valid)
  color: rgb(176,0,32)
</style>
