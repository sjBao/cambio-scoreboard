import type { Component, JSX } from "solid-js";
import styles from './Button.module.css'

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    light?: boolean
}

export const Button: Component<ButtonProps> = (props) => {
    const { label, light } = props
    return(
        <button 
            classList={{
                [styles.button]: true,
                [styles.light]: light
            }} 
            {...props} 
        >
            {label}
        </button>
    )
}
