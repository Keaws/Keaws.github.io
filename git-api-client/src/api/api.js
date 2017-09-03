const REPOS_PER_PAGE = 20;

const getReposURL = (user, page) => {
	return `https://api.github.com/users/${user}/repos?page=${page}&per_page=${REPOS_PER_PAGE}`;
}

const getRepoUrl = (fullName) => {
  return `https://api.github.com/repos/${fullName}`;
}

const getContributorsUrl = (fullName) => {
  return `https://api.github.com/repos/${fullName}/contributors`;
}

const getLanguagesUrl = (fullName) => {
  return `https://api.github.com/repos/${fullName}/languages`;
}

const getPopularPullRequestsLink = (fullName) => {
  return `https://api.github.com/repos/${fullName}/pulls?sort=popularity&per_page=5&direction=desc`;
}

class API {
	static getRepos(user, page) {
		return fetch(getReposURL(user, page), {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });
  }
  
  static getRepoInfo(fullName) {
    return fetch(getRepoUrl(fullName));
  }

  static getRepoContributors(fullName) {
    return fetch(getContributorsUrl(fullName));
  }

  static getRepoLanguages(fullName) {
    return fetch(getLanguagesUrl(fullName));
  }

  static getPopularPullRequests(fullName) {
    return fetch(getPopularPullRequestsLink(fullName));
  }
}

export default API;
