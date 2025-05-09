/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_API_URL = 'https://www.reddit.com'

export const getSubredditPosts = async (subredditUrl: string, searchTerm = '') => {
  let url = `${BASE_API_URL}${subredditUrl}.json`

  if (searchTerm !== '') {
    url = `${BASE_API_URL}${subredditUrl}search.json?q=${searchTerm}&restrict_sr=1`
  }

  const response = await fetch(url)
  const json = await response.json()

  return json.data.children.map((post: any) => post.data)
}

export const getSubreddits = async () => {
  const response = await fetch(`${BASE_API_URL}/subreddits.json`)
  const json = await response.json()

  return json.data.children.map((subreddit: any) => subreddit.data)
}

export const getPostComments = async (permalink: string) => {
  const response = await fetch(`${BASE_API_URL}${permalink}.json`)
  const json = await response.json()

  return json[1].data.children.map((subreddit: any) => subreddit.data)
}
