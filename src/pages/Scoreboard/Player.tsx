import type { Component } from "solid-js";
import styles from './Scoreboard.module.css'

import { FlexContainer } from "../../components/FlexContainer";

interface PlayerProps {
  name: string;
}
export const Player: Component<PlayerProps> = ({ name }) => {
  return (
    <FlexContainer className={styles.playerContainer} flexDirection="column">
      <div class={styles.playerIcon}>{name[0]}</div>
      <div class={styles.playerName}>{name}</div>
    </FlexContainer>
  )
}
