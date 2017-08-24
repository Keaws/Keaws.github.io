import { h } from 'preact';

export function Repo (props) {
	return (
		<div>
			<p>Name: {props.name}</p>
			<p>Description: {props.description}</p>
			<p>Forked: {props.fork.toString()}</p>
			<p>Stars: {props.stargazers_count}</p>
			<p>Updated: {props.pushed_at}</p>
			<p>Language: {props.language}</p>
			<br />
		</div>
	)
}

export default Repo;
