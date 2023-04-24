export const RULE = Object.freeze({
  OneLetter: 'OneLetter',
  UpperAndLower: 'UpperAndLower',
  OneNumber: 'OneNumber',
  SpecialSymbol: 'SpecialSymbol',
  LongerThan4: 'LongerThan4',
  LongerThan8: 'LongerThan8',
  LongerThan12: 'LongerThan12'
});

export const RULE_CONFIG = Object.freeze({
  [RULE.OneLetter]: {
    name: 'OneLetter',
    pattern: /[a-zA-Z]/
  },
  [RULE.UpperAndLower]: {
    name: 'UpperAndLower',
    pattern: /(?=.*[a-z])(?=.*[A-Z])/g
  },
  [RULE.OneNumber]: {
    name: 'OneNumber',
    pattern: /\d+/
  },
  [RULE.SpecialSymbol]: {
    name: 'SpecialSymbol',
    pattern: /[ !@~#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  },
  [RULE.LongerThan4]: {
    name: 'LongerThan4',
    pattern: ''
  },
  [RULE.LongerThan8]: {
    name: 'LongerThan8',
    pattern: ''
  },
  [RULE.LongerThan12]: {
    name: 'LongerThan12',
    pattern: ''
  }
});
