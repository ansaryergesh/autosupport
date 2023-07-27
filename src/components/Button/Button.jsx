import { Button as ButtonAntd } from 'antd';

export default function Button({
  type = 'default',
  color = 'default',
  children,
  disabled = false,
  loading,
  withoutMargin = false,
  className = '',
  iconPosition = 'right',
  iconButton = null,
  style = {},
  ...otherProps
}) {
  return (
    <ButtonAntd
      className={`
                ${iconButton && `buttonComponent-${iconPosition}`}
                button-${type}
                ${className}
                ${color}
            `}
      disabled={disabled}
      loading={loading}
      style={{ marginRight: withoutMargin ? 0 : '5px', ...style }}
      {...otherProps}>
      {children}
      {iconButton}
    </ButtonAntd>
  );
}
