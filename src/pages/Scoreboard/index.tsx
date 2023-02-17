import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import { Player } from "./Player";
import styles from './Scoreboard.module.css'

import { Button } from "../../components/Button";
import { FlexContainer } from "../../components/FlexContainer";
import { Logo } from '../../components/Logo';
import { TextInput } from "../../components/TextInput";

export const Scoreboard: Component = () => {
	const [newPlayerInput, setNewPlayerInput] = createSignal<string>('');
	const [players, setPlayers] = createSignal<string[]>([]);

	function handleAddPlayer(event: SubmitEvent) {
		event.preventDefault()
		const target = event.target as typeof event.target & {
			["new-player"]: HTMLInputElement
		}
		const newPlayerName = target["new-player"].value

		if (newPlayerName) {
			setPlayers([...players(), newPlayerName])
			setNewPlayerInput('')
		}
	}

	return (
		<main>
			<FlexContainer alignItems="stretch">
				<Logo />
				<TextInput
					placeholder="New game name"
					textAlign="center"
				/>

				<FlexContainer>
					<p>Add your players:</p>
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
					<p>Current Players:</p>
					<FlexContainer>
						<>
							{
								players().map((player) => <Player name={player} />)
							}
						</>
					</FlexContainer>
				</div>

				<Button disabled={!players().length} label="START GAME" />
			</FlexContainer>
		</main>
	)
}
