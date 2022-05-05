import React from "react";
import styles from '../../styles/buttonStyles.module.css'

interface Props {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styleClass?: string
}

const Button: React.FC<Props> = ({
  children,
  styleClass,
  onClick
}) => {
  return (
    <button className={[styles.bg_redd, styleClass, 'text-sm', 'text-bold'].join(' ')} onClick={onClick} >
      {children}
    </button >
  );
}

export default Button;