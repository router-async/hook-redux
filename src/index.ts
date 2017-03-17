import { createAction, handleActions } from 'redux-actions-helpers';

// actions
export const start = createAction('@@router/START', payload => ({ payload }));
export const end = createAction('@@router/END', payload => ({ payload }));
export const error = createAction('@@router/ERROR', payload => ({ payload }));
// export const cancel = createAction('@@router/CANCEL');

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
    [start + end + error]: (state, { payload }) => {
        return {
            ...state,
            ...payload
        }
    }/*,
    [cancel]: () => {
        return initialState;
    }*/
}, { initialState });

// hook
export const firstHookRedux = ({ dispatch }) => ({
    render: ({ route, status, params, redirect }) => {
        dispatch(end({ route, status, params, redirect, isTransition: false }));
    }
});
export const lastHookRedux = ({ dispatch }) => ({
    start: ({ path, location }) => {
        dispatch(start({ path, location, isTransition: true }));
    },
    error: ({ error: err }) => {
        dispatch(error({ err, isTransition: false }));
    },
    cancel: () => {
        console.warn('router cancel transition');
        // dispatch(cancel());
    }
});
