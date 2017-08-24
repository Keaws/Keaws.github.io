const getReposURL = (user) => {
	return `https://api.github.com/users/${user}/repos`;
}

class API {
	static getRepos(user) {
		return fetch(getReposURL(user));
	}
}

export default API;
