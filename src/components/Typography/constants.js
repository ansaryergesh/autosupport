export const TypoGraphyType = {
  HEADER: 'HEADER',
  SECONDARY_HEAD: 'SECONDARY_HEAD',
  SUB_HEAD: 'SUB_HEAD',
  SIDEBAR: 'SIDEBAR',
  LEVEL_1: 'LEVEL_1',
  LEVEL_2: 'LEVEL_2',
  LEVEL_3: 'LEVEL_3'
};

export const fontSize = (type) => {
  switch (type) {
    case TypoGraphyType.HEADER:
      return 'var(--font-text-primary-header)';
    case TypoGraphyType.SECONDARY_HEAD:
      return 'var(--font-text-secondary-head)';
    case TypoGraphyType.SUB_HEAD:
      return 'var(--font-text-sub-head)';
    case TypoGraphyType.SIDEBAR:
      return 'var(--font-text-sidebar)';
    case TypoGraphyType.LEVEL_1:
      return 'var(--font-text-level-1)';
    case TypoGraphyType.LEVEL_2:
      return 'var(--font-text-level-2)';
    case TypoGraphyType.LEVEL_3:
      return 'var(--font-text-level-3)';
  }
};

export const fontWeight = (type) => {
  switch (type) {
    case TypoGraphyType.HEADER:
      return 'var(--font-weight-primary-header)';
    case TypoGraphyType.SECONDARY_HEAD:
      return 'var(--font-weight-secondary-head)';
    case TypoGraphyType.SUB_HEAD:
      return 'var(--font-weight-sub-head)';
    case TypoGraphyType.SIDEBAR:
      return 'var(--font-weight-sidebar)';
    case TypoGraphyType.LEVEL_1:
      return 'var(--font-weight-level-1)';
    case TypoGraphyType.LEVEL_2:
      return 'var(--font-weight-level-2)';
    case TypoGraphyType.LEVEL_3:
      return 'var(--font-weight-level-3)';
  }
};

export const paddingSize = (type) => {
  switch (type) {
    case TypoGraphyType.SECONDARY_HEAD:
      return 'var(--padding-secondary-head)!important';
    case TypoGraphyType.SUB_HEAD:
      return 'var(--padding-secondary-head)!important';
  }
};
