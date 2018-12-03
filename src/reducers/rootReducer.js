import {combineReducers} from 'redux'

import userReducer from './userReducer'
import tweetReducer from './tweetReducer'


const rootReducer = combineReducers({
    userReducer,
    tweetReducer
})

export default rootReducer