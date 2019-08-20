// Реализуйте редьюсер

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {addKey} from './actions';

// В этом редьюсере вам нужно будет обрабатывать addApiKey экшен.

const apiKey = handleActions(
    {
        [addKey]: (state, action) => action.payload
    },
    null,
);

export default combineReducers({
    apiKey,
});

export const getIsAuthorized = state => !!state.auth.apiKey;
export const getApiKey = state => state.auth.apiKey;