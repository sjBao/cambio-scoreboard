import { useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { SPLASH_PAGE_CONTENT } from "./copy";
import styles from './Splash.module.css';

export const Splash: Component = () => {

	const navigate = useNavigate();

	return (
		<main class={styles.pageContainer}>
			<Logo />
			<Button label="New Game" onClick={() => navigate("/cambio-scoreboard/scoreboard")} />
			<article class={styles.rulesContainer}>
				{SPLASH_PAGE_CONTENT.sections.map((content) => <section>
					<h3>{content.title}</h3>
					<div>{content.body}</div>
				</section>)}
			</article>
		</main>
	)
}
