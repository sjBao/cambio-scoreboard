import { render } from 'solid-js/web'
import { Router, Routes, Route } from '@solidjs/router'
import { Splash } from './pages/Splash'
import { Scoreboard } from './pages/Scoreboard'
import './App.css'

import { GameProvider } from './contexts/Game'

render(
	() => (
		<GameProvider>
			<Router>
				<Routes>
					<Route path="/cambio-scoreboard" component={Splash} />
					<Route path="/cambio-scoreboard/scoreboard" component={Scoreboard} />
				</Routes>
			</Router>
		</GameProvider>
	), 
	document.getElementById('root')!
)

