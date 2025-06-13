import type { MouseEventHandler } from "react";

export interface IconButtonProps {
    title?: string;
    icon?: string;
    additionalClass?: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}