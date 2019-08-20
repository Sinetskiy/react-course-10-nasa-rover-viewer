// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер

const photos = handleActions(
    {
        [fetchPhotosRequest]: (state, action) => {
            const {sol, name} = action.payload;
            let obj = {};
            let obj2 = {};
            obj2[sol] = {isLoading: true, photos: [], isLoaded: false};
            obj[name] = obj2;
            return obj;
        },
        [fetchPhotosSuccess]:
            (state, action) => {
                const {sol, name, photos} = action.payload;
                let obj = {};
                let obj2 = {};
                obj2[sol] = {isLoading: false, photos, isLoaded: true};
                obj[name] = obj2;
                return obj;
            },
    },
    null,
);

const sol = handleActions(
    {
        [changeSol]: (state, action) => action.payload,
    },
    null,
);

export default combineReducers({
    photos,
    sol
});