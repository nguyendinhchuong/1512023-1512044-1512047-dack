import {combineReducers} from 'redux'

import userReducer from './userReducer'
import tweetReducer from './tweetReducer'
import followReducer from './followReducer'


const rootReducer = combineReducers({
    userReducer,
    tweetReducer,
    followReducer
})

export default rootReducer