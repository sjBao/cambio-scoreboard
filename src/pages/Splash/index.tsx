import type { Component } from "solid-js";
import styles from './Splash.module.css'

import { SPLASH_PAGE_CONTENT } from "./copy";

export const Splash: Component= () => {
    return (
        <main>
            <h1 class={styles.logo}>Cambio</h1>
            <button>New Game</button>
            <article>
                <section>
                    {SPLASH_PAGE_CONTENT.sections.map((content) => <div>
                        <h3>{content.title}</h3>
                        <div>{content.body}</div>
                    </div>)}
                </section>
            </article>
        </main>
    )
}
