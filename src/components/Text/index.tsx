import type { ParentComponent } from "solid-js";
import styles from './Text.module.css'

interface TextProps {
  align?: 'left' | 'center' | 'right';
  className?: string;
  type?: string;
  size?: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge';
  weight?: 'bold';
}

export const Text: ParentComponent<TextProps> = ({
  align = 'left',
  children,
  className,
  size = 'normal',
  type = 'text',
  weight = 'normal',
}) => {
  if (type === 'text') {
    const classOverrides = className?.split(/\s+/).reduce((acc, curr) => {
      acc[curr] = true
      return acc
    }, {} as Record<string, boolean>)

    const classList = {
      [styles.base]: true,
      [styles.alignCenter]: align === 'center',
      [styles.alignLeft]: align === 'left',
      [styles.alignRight]: align === 'right',
      [styles.bold]: weight === 'bold',
      [styles.sizeL]: size === 'large',
      [styles.sizeNormal]: size === 'normal',
      [styles.sizeS]: size === 'small',
      [styles.sizeXL]: size === 'xlarge',
      [styles.sizeXXL]: size === 'xxlarge',
      ...classOverrides
    }

    return (
      <p classList={classList}>
        {children}
      </p>
    )
  }
}
