import { Component } from "solid-js";
import { createSignal, createEffect, Switch, Match } from "solid-js";

import { CreateNewGame } from "./CreateNewGame";
import { PlayerScores } from "./PlayerScores";

import { useGameContext } from "../../contexts/Game";
import { FlexContainer } from "../../components/FlexContainer";
import { Logo } from '../../components/Logo';

export const Scoreboard: Component = () => {
	const [ state ]  = useGameContext();


	return (
		<main>
			<FlexContainer alignItems="stretch">
				<Logo />
				<Switch>
					<Match when={state.status === 'not-started'}>
						<CreateNewGame />
					</Match>
					<Match when={state.status === 'in-progress'}>
						<PlayerScores />
					</Match>
					<Match when={state.status === 'finished'}>
						<div>Game finished</div>
					</Match>
				</Switch>
			</FlexContainer>
		</main>
	)
}
