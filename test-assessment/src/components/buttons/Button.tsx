
import type { IconButtonProps } from "@/types/button";
import type { FC } from "react";

const Button: FC<IconButtonProps> = ({ title, icon, onClick, additionalClass, disabled }) => {
  return (
    <button 
        className={"bg-emerald-800 hover:bg-emerald-900 text-white rounded py-1 px-2 disabled:bg-gray-400 disabled:text-gray-600" + additionalClass } 
        onClick={onClick}
        disabled={disabled}
    >
        {icon && (
            <i className={icon + "me-2"} aria-hidden="true"/>
        )}
        {title}
    </button>
  )
}

export default Button;