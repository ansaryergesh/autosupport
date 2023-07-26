import { Button as ButtonAntd } from 'antd';

export default function Button({
       type = 'default',
       color='default',
       children,
       disabled = false,
       loading,
       withoutMargin = false,
       className = '',
       style = {},
       ...otherProps
   }) {
    return (
        <ButtonAntd
            className={`
        button-${type}
        ${className}
        ${color}
      `}
            disabled={disabled}
            loading={loading}
            style={{ marginRight: withoutMargin ? 0 : '5px', ...style }}
            {...otherProps}
        >
            {children}
        </ButtonAntd>
    );
}
