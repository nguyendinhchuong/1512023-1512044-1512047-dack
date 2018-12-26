import { applyMiddleware, createStore } from 'redux'
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer'

// const middleware = applyMiddleware(thunk, logger);
const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer, middleware);


// store.dispatch({ type: "FETCH_USER_FULFILLED", payload: { profilePhoto: "http://placehold.it/500x500", name: "chuong", subname: "@chuong" } });
// // store.dispatch({ type: "FETCH_USER_FULFILLED", payload: { profilePhoto: "123456", name: "bao", subname: "@cong" } });
store.dispatch({
    type: "FETCH_FOLLOWER_NUMBER",
    payload: 3
});
store.dispatch({
    type: "FETCH_FOLLOWING_NUMBER",
    payload: 4
});
store.dispatch({
    type:"FETCH_FOLLOWER_LIST",
    payload:[
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Diệu Ngọc Bảo"
        },
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Dương Minh Công"
        },
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Nguyễn Đình Chương"
        }
    ]
});
store.dispatch({
    type:"FETCH_FOLLOWING_LIST",
    payload:[
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Diệu Ngọc Bảo"
        },
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Dương Minh Công"
        },
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Nguyễn Đình Chương"
        },
        {
            profilePhoto:"http://placehold.it/300x200",
            name: "Nguyễn Đình Chương"
        }
    ]
});
store.subscribe(()=>{console.log(store.getState())})
export default store;