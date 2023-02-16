import { render } from 'solid-js/web'
import { Router, Routes, Route } from '@solidjs/router'
import { Splash } from './pages/Splash'
import './App.css'

render(
	() => (
		<Router>
			<Routes>
				<Route path="/cambio-scoreboard" component={Splash} />
			</Routes>
		</Router>
	), 
	document.getElementById('root')!
)

