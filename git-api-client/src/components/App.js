import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from './Home/Home';
import Profile from './Profile/Profile';
import Error from './Error/Error';
import { PATH } from '../path/path';
import './App.css';

export default class App extends Component {
	render() {
		return (
			<main id="app">
				<Router>
					<Home path={PATH} />
					<Profile path={PATH + '/:user'} />
					<Error default />
				</Router>
			</main>
		);
	}
}
