import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from './Home/Home';
import Profile from './Profile/Profile';
import Error from './Error/Error';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Router >
					<Home path="/" />
					<Profile path="/:user" />
					<Error default />
				</Router>
			</div>
		);
	}
}
