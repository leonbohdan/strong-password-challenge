const StrengthOption = Object.freeze({
  Weak: 'weak',
  Strong: 'strong'
});

const StrengthOptionLabel = Object.freeze({
  [StrengthOption.Weak]: 'Password is weak',
  [StrengthOption.Strong]: 'Password is strong enough'
});

export { StrengthOption, StrengthOptionLabel };
