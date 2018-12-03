import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer'

const middleware = applyMiddleware(thunk, logger);

const store = createStore(rootReducer, middleware);

store.subscribe(() => {
    console.log("store change", store.getState());
})
// store.dispatch({ type: "FETCH_USER_FULFILLED", payload: { profilePhoto: "abcd", name: "chuong", subname: "@chuong" } });
// store.dispatch({ type: "FETCH_USER_FULFILLED", payload: { profilePhoto: "123456", name: "bao", subname: "@cong" } });
// store.dispatch({ type: "FETCH_TWEET_FULFILLED", payload: { heading: "Heading 1", tweet: "I have a first tweet", like: 1, comment:["comment 1", "commnent 2", "comment 3"], share: 3} });
// store.dispatch({type:"LIKE_TWEET", payload:1});
// store.dispatch({type:"COMMENT_TWEET", payload:"react redux"});
export default store;