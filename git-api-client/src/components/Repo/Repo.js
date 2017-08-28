import { h } from 'preact';

export function Repo ( {name, description, fork, stargazers_count, pushed_at, language} ) {
	return (
		<div>
			<p>Name: {name}</p>
			<p>Description: {description}</p>
			<p>Forked: {fork.toString()}</p>
			<p>Stars: {stargazers_count}</p>
			<p>Updated: {pushed_at}</p>
			<p>Language: {language}</p>
			<br />
		</div>
	)
}

export default Repo;
