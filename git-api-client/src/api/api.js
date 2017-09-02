const REPOS_PER_PAGE = 20;

const getReposURL = (user, page) => {
	return `https://api.github.com/users/${user}/repos?page=${page}&per_page=${REPOS_PER_PAGE}`;
}

class API {
	static getRepos(user, page) {
		return fetch(getReposURL(user, page), {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });
	}
}

export default API;
