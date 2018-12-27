export function fetchTweet() {
    return {
        type: "FETCH_TWEET_FULFILLED",
        payload: {
            tweets: [],
            heading: '',
            like: null,
            comment: '',
            share: null
        }
    }
}
export function likeTweets() {
    return {
        type: "LIKE_TWEET"
    }
}

export function commentTweets() {
    return {
        type: "COMMENT_TWEET",
        payload: {
            cmt: ''
        }
    }
}
export function fetchTweets(tweets) {
    return {
        type: "FETCH_TWEETS",
        payload: {
            tweets: [...tweets]
        }
    }
}

export function getTweetNumber() {
    return {
        type: "GET_TWEET_NUMBER",
        payload: {}
    }
}
export function postTweet(data) {
    return {
        type: "POST_TWEET",
        payload: {
            content: data.content,
            time: data.time
        }
    }
}
