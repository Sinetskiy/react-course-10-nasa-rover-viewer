// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess} from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер

const photos = handleActions(
    {
        [fetchPhotosRequest]: (state, action) => {
            const {sol, name} = action.payload;
            if (state && state.hasOwnProperty(name)) {
                return {
                    ...state,
                    [name]: {
                        ...state[name],
                        [sol]: {isLoading: true, photos: [], isLoaded: false}
                    }
                };
            }
            return state;
        },
        [fetchPhotosSuccess]: (state, action) => {
            const {sol, name, photos} = action.payload;
            if (state && state.hasOwnProperty(name)) {
                return {
                    ...state,
                    [name]: {
                        ...state[name],
                        [sol]: {isLoading: false, photos, isLoaded: true}
                    }
                };
            }
            return state;
        },
    },
    {
        'curiosity': {},
        'opportunity': {},
        'spirit': {}
    },
);

const sol = handleActions(
    {
        [changeSol]: (state, action) => action.payload,
    },
    null,
);

export default combineReducers({
    sol,
    photos
});