// Реализуйте саги
import {takeLatest, select, put, call, fork, all} from 'redux-saga/effects';
import {changeSol, fetchPhotosSuccess, fetchPhotosFailure, fetchPhotosRequest} from "./actions";
import {addKey, getApiKey} from "../Auth";
import {getPhotos} from "./api";


function* actionsWatcher() {
    yield takeLatest(changeSol, fetchPhotos);
    yield takeLatest(addKey, fetchPhotos);
}

export function* fetchPhotos(action) {

    const apiKey = yield select(getApiKey);
    const sol = action.payload.current | 1;

    try {

        yield all([
            put(fetchPhotosRequest({name: 'curiosity', sol})),
            put(fetchPhotosRequest({name: 'opportunity', sol})),
            put(fetchPhotosRequest({name: 'spirit', sol}))
        ]);

        const [curiosity, opportunity, spirit] = yield all([
            call(getPhotos, apiKey, 'curiosity', sol),
            call(getPhotos, apiKey, 'opportunity', sol),
            call(getPhotos, apiKey, 'spirit', sol)
        ]);

        yield all([
            put(fetchPhotosSuccess({name: 'curiosity', sol, photos: curiosity.photos})),
            put(fetchPhotosSuccess({name: 'opportunity', sol, photos: opportunity.photos})),
            put(fetchPhotosSuccess({name: 'spirit', sol, photos: spirit.photos}))
        ]);

    } catch (ex) {
        yield put(fetchPhotosFailure(ex));
    }
}

export default function* () {
    yield fork(actionsWatcher);
}
