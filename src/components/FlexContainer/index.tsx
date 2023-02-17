import { children, Component, JSX } from "solid-js"

import styles from './FlexContainer.module.css'

interface FlexContainerProps {
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
    children?: JSX.Element
    className?: string
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
    gridGap?: 'sm' | 'md' | 'lg'
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}
export const FlexContainer: Component<FlexContainerProps> = ({ 
    children, 
    className,
    flexDirection, 
    flexWrap, 
    justifyContent, 
    alignItems,
    gridGap
}) => {
    const classNames = (className?.split(/\s+/) || []).reduce((classNameMapping, name) => {
        classNameMapping[name] = true
        return classNameMapping
    }, {} as Record<string, boolean>)

    console.log("**** flexAignItems: ", alignItems)

    return (
        <div 
            classList={{
                [styles.flexContainer]: true,
                [styles.flexAlignItemsBaseline]: alignItems === 'baseline',
                [styles.flexAlignItemsCenter]: alignItems === 'center',
                [styles.flexAlignItemsEnd]: alignItems === 'flex-end',
                [styles.flexAlignItemsStart]: alignItems === 'flex-start',
                [styles.flexAlignItemsStretch]: alignItems === 'stretch',
                [styles.flexDirectionColumn]: flexDirection === 'column',
                [styles.flexDirectionColumnReverse]: flexDirection === 'column-reverse',
                [styles.flexDirectionRow]: flexDirection === 'row',
                [styles.flexDirectionRowReverse]: flexDirection === 'row-reverse',
                [styles.flexWrapNoWrap]: flexWrap === 'nowrap',
                [styles.flexWrapWrap]: flexWrap === 'wrap',
                [styles.flexWrapWrapReverse]: flexWrap === 'wrap-reverse',
                [styles.flexJustifyContentCenter]: justifyContent === 'center',
                [styles.flexJustifyContentEnd]: justifyContent === 'flex-end',
                [styles.flexJustifyContentSpaceAround]: justifyContent === 'space-around',
                [styles.flexJustifyContentSpaceBetween]: justifyContent === 'space-between',
                [styles.flexJustifyContentSpaceEvenly]: justifyContent === 'space-evenly',
                [styles.flexJustifyContentStart]: justifyContent === 'flex-start',
                [styles.gridGapSmall]: gridGap === 'sm',
                [styles.gridGapMedium]: gridGap === 'md',
                [styles.gridGapLarge]: gridGap === 'lg',
                ...classNames
            }}
        >
            {children}
        </div>
    )
}
