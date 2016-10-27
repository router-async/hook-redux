import { createAction, handleActions } from 'redux-actions-helpers';

// actions
const startTransition = createAction('@@router/START_TRANSITION', payload => ({ payload }));
const endTransition = createAction('@@router/END_TRANSITION', payload => ({ payload }));

// reducer
const initialState = {
    path: null,
    route: null,
    status: null,
    params: null,
    redirect: null,

};
export const reducer = handleActions({
    [startTransition]: (state, { payload }) => {
        // refactor: https://github.com/Microsoft/TypeScript/issues/2103
        return Object.assign({}, state, payload);
    },
    [endTransition]: (state, { payload }) => {
        // refactor: https://github.com/Microsoft/TypeScript/issues/2103
        return Object.assign({}, state, payload);
    }
}, { initialState });

// hook
export const hookRedux = ({ dispatch }) => ({
    start: ({ path }) => {
        dispatch(startTransition({ path }));
    },
    resolve: ({ path, route, status, params, redirect }) => {
        dispatch(endTransition({ path, route, status, params, redirect }));
    }
});