
import type { IconButtonProps } from "@/types/button";
import type { FC } from "react";

const IconButton: FC<IconButtonProps> = ({ title, icon, onClick, additionalClass, disabled }) => {
  return (
    <button 
        className={"bg-emerald-800 hover:bg-emerald-900 text-white rounded py-1 px-2 disabled:bg-gray-400 disabled:text-gray-600" + additionalClass } 
        onClick={onClick}
        disabled={disabled}
    >
        <i className={icon} aria-hidden="true"/>
        <span className="sr-only">{title}</span>
    </button>
  )
}

export default IconButton;