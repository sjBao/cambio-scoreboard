import type { Component } from "solid-js";
import { Button } from "../../components/Button";
import { SPLASH_PAGE_CONTENT } from "./copy";
import styles from './Splash.module.css';

export const Splash: Component= () => {
    return (
        <main class={styles.pageContainer}>
            <h1 class={styles.logo}>Cambio</h1>
            <Button label="New Game" />
            <article class={styles.rulesContainer}>
                    {SPLASH_PAGE_CONTENT.sections.map((content) => <section>
                        <h3>{content.title}</h3>
                        <div>{content.body}</div>
                    </section>)}
            </article>
        </main>
    )
}
