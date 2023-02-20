import type { Component } from "solid-js";
import { For, batch, createSignal } from 'solid-js'

import styles from './Scoreboard.module.css'

import { TextInput } from "../../components/TextInput";
import { FlexContainer } from "../../components/FlexContainer";
import { Text } from '../../components/Text';
import { Button } from "../../components/Button";
import { Player } from "./Player";
import { useGameContext } from "../../contexts/Game";


interface CreateNewGameProps {}

export const CreateNewGame: Component<CreateNewGameProps>  = () => {
  const [state, { addPlayer, setGameStatus }] = useGameContext()
  const [newPlayerInput, setNewPlayerInput] = createSignal<string>('');

  function handleAddPlayer(event: SubmitEvent) {
		event.preventDefault()
		const target = event.target as typeof event.target & {
			["new-player"]: HTMLInputElement
		}
		const newPlayerName = target["new-player"].value

		if (newPlayerName) {
			batch(() => {
				addPlayer(newPlayerName)
				setNewPlayerInput('')
			})
		}
	}

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
          <For each={state.players}>
            { (player) => <Player name={player} /> }
          </For>
        </FlexContainer>
      </div>

      <Button 
        disabled={!state.players.length} 
        label="START GAME"
        onClick={() => setGameStatus('in-progress')}
      />
    </>
  )
}
