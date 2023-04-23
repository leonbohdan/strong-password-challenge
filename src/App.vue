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
  <v-card elevation="0">
    <v-layout>
      <v-app-bar color="primary">
        <v-container>
          <span class="text-h5">Strong password challenge</span>
        </v-container>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row dense>
            <v-col cols="12" md="6" class="mx-auto">
              <v-text-field
                v-model="password"
                clearable
                label="Password"
                variant="outlined"
                :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isShowPassword ? 'text' : 'password'"
                :hint="hintMessage"
                counter
                @click:append="isShowPassword = !isShowPassword"
                @click:clear="password = ''"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="6" class="mx-auto">
              <v-list class="py-0">
                <v-list-item
                  v-for="rule in ruleItems"
                  :key="rule.name"
                  :class="['px-0', rule.isValid(password) ? 'valid' : 'not-valid']"
                >
                  {{ rule.description }}
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <!--          <v-row>-->
          <!--            <v-col>-->
          <!--              <div>-->
          <!--                <input data-test="password-field" v-model="password" />-->

          <!--                <div data-test="validation-summary">{{ hintMessage }}</div>-->

          <!--                <ul>-->
          <!--                  <li-->
          <!--                    v-for="rule in ruleItems"-->
          <!--                    :key="rule.name"-->
          <!--                    :data-test-rule-indicator="rule.name"-->
          <!--                    class="password-hint__rule password-hint__rule&#45;&#45;fail"-->
          <!--                    :class="[-->
          <!--                      'px-0',-->
          <!--                      rule.isValid(password) ? 'valid' : 'not-valid',-->
          <!--                      `password-hint__rule&#45;&#45;${rule.isValid(password) ? 'pass' : 'fail'}`-->
          <!--                    ]"-->
          <!--                  >-->
          <!--                    {{ rule.description }}-->
          <!--                  </li>-->
          <!--                </ul>-->
          <!--              </div>-->
          <!--            </v-col>-->
          <!--          </v-row>-->
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
