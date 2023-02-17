import type { Component, JSX } from "solid-js"

import styles from './TextInput.module.css'

interface TextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    textAlign?: 'center'
}

export const TextInput: Component<TextInputProps> = (props) => {
    const { textAlign } = props
    return (
        <input 
            classList={{
                [styles.textInput]: true,
                [styles.textAlignCenter]: textAlign == 'center'
            }} 
            type="text" {...props} 
        />
    )
}
