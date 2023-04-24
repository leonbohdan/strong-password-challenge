import { computed, ref } from 'vue';
import { RULE_CONFIG, RULE } from '@/domain/password/rules';
import { StrengthOption, StrengthOptionLabel } from '@/domain/password/strength-options';

export function usePasswordValidation() {
  const rules = {
    isOneLetter: (v) => {
      const pattern = RULE_CONFIG[RULE.OneLetter].pattern;
      const hasOneLetter = pattern.test(v);
      setOrDeleteRule(hasOneLetter, RULE_CONFIG[RULE.OneLetter].name);
      return hasOneLetter;
    },
    isUpperAndLower: (v) => {
      const pattern = RULE_CONFIG[RULE.UpperAndLower].pattern;
      const hasUpperAndLower = pattern.test(v);
      setOrDeleteRule(hasUpperAndLower, RULE_CONFIG[RULE.UpperAndLower].name);
      return hasUpperAndLower;
    },
    isOneNumber: (v) => {
      const pattern = RULE_CONFIG[RULE.OneNumber].pattern;
      const hasOneNumber = pattern.test(v);
      setOrDeleteRule(hasOneNumber, RULE_CONFIG[RULE.OneNumber].name);
      return hasOneNumber;
    },
    isOneSpecialSymbol: (v) => {
      const pattern = RULE_CONFIG[RULE.SpecialSymbol].pattern;
      const hasOneSpecialSymbol = pattern.test(v);
      setOrDeleteRule(hasOneSpecialSymbol, RULE_CONFIG[RULE.SpecialSymbol].name);
      return hasOneSpecialSymbol;
    },
    isLongerThan: (v, n) => {
      const isLonger = v.length > n;
      setOrDeleteRule(isLonger, RULE_CONFIG[`LongerThan${n}`]);
      return isLonger;
    }
  };

  const password = ref('');
  const isShowPassword = ref(false);
  const totalValidRules = ref(new Map());

  const setOrDeleteRule = (condition, ruleName) => {
    condition
      ? totalValidRules.value.set(ruleName, ruleName)
      : totalValidRules.value.delete(ruleName);
  };

  const ruleItems = [
    {
      name: RULE.OneLetter,
      description: 'Has at least one letter',
      isValid: (v) => rules.isOneLetter(v)
    },
    {
      name: RULE.UpperAndLower,
      description: 'Has at least one lower and one upper case letter',
      isValid: (v) => rules.isUpperAndLower(v)
    },
    {
      name: RULE.OneNumber,
      description: 'Has at least one number',
      isValid: (v) => rules.isOneNumber(v)
    },
    {
      name: RULE.SpecialSymbol,
      description: 'Has at least one special character',
      isValid: (v) => rules.isOneSpecialSymbol(v)
    },
    {
      name: RULE.LongerThan4,
      description: 'Has length > 4',
      isValid: (v) => rules.isLongerThan(v, 4)
    },
    {
      name: RULE.LongerThan8,
      description: 'Has length > 8',
      isValid: (v) => rules.isLongerThan(v, 8)
    },
    {
      name: RULE.LongerThan12,
      description: 'Has length > 12',
      isValid: (v) => rules.isLongerThan(v, 12)
    }
  ];

  const hintMessage = computed(() => {
    const is5ValidRules = totalValidRules.value.size >= 5;

    return is5ValidRules
      ? StrengthOptionLabel[StrengthOption.Strong]
      : StrengthOptionLabel[StrengthOption.Weak];
  });

  return {
    ruleItems,
    password,
    isShowPassword,
    hintMessage
  };
}
