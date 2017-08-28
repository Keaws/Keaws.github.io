import { h } from 'preact';
import Repo from '../Repo/Repo';

export default function ReposList ( { repos } ) {
	return (
        <ul>
          {repos.length > 0 
            ? repos.map(repo => <li><Repo {...repo} key={repo.id} /></li>)
            : <p>Not a single repo met filter criteria</p>
          }
		    </ul>
	)
}
