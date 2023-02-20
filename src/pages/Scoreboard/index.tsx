import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import { CreateNewGame } from "./CreateNewGame";

import { FlexContainer } from "../../components/FlexContainer";
import { Logo } from '../../components/Logo';

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
				<CreateNewGame
					players={players}
					newPlayerInput={newPlayerInput}
					handleAddPlayer={handleAddPlayer}
					setNewPlayerInput={setNewPlayerInput}
				/>
			</FlexContainer>
		</main>
	)
}
