import type { Component, Accessor } from "solid-js";
import { For } from 'solid-js'

import styles from './Scoreboard.module.css'

import { TextInput } from "../../components/TextInput";
import { FlexContainer } from "../../components/FlexContainer";
import { Text } from '../../components/Text';
import { Button } from "../../components/Button";
import { Player } from "./Player";


interface CreateNewGameProps {
  players: Accessor<string[]>;
  newPlayerInput: Accessor<string>;
  handleAddPlayer: (event: SubmitEvent) => void;
  setNewPlayerInput: (value: string) => void;
}

export const CreateNewGame: Component<CreateNewGameProps>  = ({
  players,
  newPlayerInput,
  handleAddPlayer,
  setNewPlayerInput
}) => {
  return (
    <>
      <TextInput
        placeholder="New game name"
        textAlign="center"
      />

      <FlexContainer>
        <Text size="large">Add your players</Text>
        <form class={styles.addPlayerForm} onSubmit={handleAddPlayer}>
          <FlexContainer flexDirection="row" gridGap="sm" alignItems="stretch">
            <TextInput
              name="new-player"
              onInput={(e) => setNewPlayerInput(e.currentTarget.value)}
              value={newPlayerInput()}
            />
            <Button light label="Add" type="submit" />
          </FlexContainer>
        </form>
      </FlexContainer>

      <div>
        <Text align="center" size="large">Current Players</Text>
        <FlexContainer>
          <For each={players()}>
            { (player) => <Player name={player} /> }
          </For>
        </FlexContainer>
      </div>

      <Button disabled={!players().length} label="START GAME" />
    </>
  )
}
