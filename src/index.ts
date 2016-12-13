import { createAction, handleActions } from 'redux-actions-helpers';

// actions
export const startTransition = createAction('@@router/START_TRANSITION', payload => ({ payload }));
export const endTransition = createAction('@@router/END_TRANSITION', payload => ({ payload }));

// reducer
const initialState = {
    path: null,
    location: null,
    route: null,
    status: null,
    params: null,
    redirect: null,

};
export const reducer = handleActions({
    [startTransition]: (state, { payload }) => {
        return {
            ...state,
            ...payload
        }
    },
    [endTransition]: (state, { payload }) => {
        return {
            ...state,
            ...payload
        }
    }
}, { initialState });

// hook
export const hookRedux = ({ dispatch }) => ({
    start: ({ path, location }) => {
        dispatch(startTransition({ path, location }));
    },
    resolve: ({ route, status, params, redirect }) => {
        dispatch(endTransition({ route, status, params, redirect }));
    }
});
