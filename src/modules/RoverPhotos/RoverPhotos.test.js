import reducer from './RoverPhotos'
import {
    changeSol,
    fetchPhotosRequest,
    fetchPhotosSuccess,
    fetchPhotosFailure
} from './actions'

const randomAction = {
    type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
}

describe('Reducer RoverPhotos', () => {
    const state0 = reducer(undefined, randomAction);
    console.log(state0);

    describe('action changeSol', () => {
        it('Меняет номер сола в sol.current', () => {
            const testValue = 10;
            const state1 = reducer(state0, changeSol({current: testValue}));

            expect(state1.sol.current).toBe(testValue)
        })
    });
    ['curiosity', 'opportunity', 'spirit'].forEach(name => {
        describe(`action fetchPhotosRequest("${name}", 10)`, () => {
            it(`Создает запись в редьсере photos.${name} [10]: {isLoading: true, photos: [], isLoaded: false}`, () => {
                const sol = 10;
                const state1 = reducer(state0, fetchPhotosRequest({name, sol}));
                expect(state1.photos[name]).toEqual({
                    [sol]: {isLoading: true, photos: [], isLoaded: false}
                })
            })
        });
        describe(`action fetchPhotosSuccess({"name: ${name}", sol: 10, photos: [1, 2, 3]})`, () => {
            it(`Создает запись в редьсере photos.${name} [10]: {isLoading: true, photos: [1, 2, 3], isLoaded: false}`, () => {
                const sol = 10;
                const state1 = reducer(state0, fetchPhotosRequest({name, sol}));
                const state2 = reducer(
                    state1,
                    fetchPhotosSuccess({name, sol, photos: [1, 2, 3]})
                );
                expect(state2.photos[name]).toEqual({
                    [sol]: {isLoading: false, photos: [1, 2, 3], isLoaded: true}
                })
            })
        });
    })
});
