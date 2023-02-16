import type { Component } from "solid-js";
import styles from './Button.module.css'

interface ButtonProps {
    label?: string
}

export const Button: Component<ButtonProps> = ({ label }) => {
    return(
        <button class={styles.button}>
            {label}
        </button>
    )
}
