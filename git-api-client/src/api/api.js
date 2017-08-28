const getReposURL = (user) => {
	return `https://api.github.com/users/${user}/repos`;
}

class API {
	static getRepos(user) {
		return fetch(getReposURL(user), {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });
	}
}

export default API;
