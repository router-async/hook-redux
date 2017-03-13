import { createAction, handleActions } from 'redux-actions-helpers';

// actions
export const start = createAction('@@router/START', payload => ({ payload }));
// TODO: remove this action in future
export const resolve = createAction('@@router/RESOLVE', payload => ({ payload }));
export const end = createAction('@@router/END', payload => ({ payload }));
export const error = createAction('@@router/ERROR', payload => ({ payload }));
export const cancel = createAction('@@router/CANCEL');

// reducer
const initialState = {
    path: null,
    location: null,
    route: null,
    status: null,
    params: null,
    redirect: null,
    error: null,
    isTransition: false
};
export const reducer = handleActions({
    [start + resolve + end + error]: (state, { payload }) => {
        return {
            ...state,
            ...payload
        }
    },
    [cancel]: () => {
        return initialState;
    }
}, { initialState });

// hook
export const hookRedux = ({ dispatch }) => ({
    start: ({ path, location }) => {
        dispatch(start({ path, location, isTransition: true }));
    },
    resolve: ({ route, status, params, redirect }) => {
        dispatch(resolve({ route, status, params, redirect }));
    },
    render: () => {
        dispatch(end({ isTransition: false }));
    },
    error: ({ error }) => {
        dispatch(error({ error, isTransition: false }));
    },
    cancel: () => {
        dispatch(cancel());
    }
});
