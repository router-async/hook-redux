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
    params: {},
    redirect: null,
    error: null,
    isTransition: false,
    ctx: {}
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
export const hookRedux = ({ dispatch, server }) => ({
    start: ({ path, location, ctx }) => {
        const plainCtx = ctx.toObject();
        dispatch(start({ path, location, isTransition: true, ctx: plainCtx }));
    },
    resolve: ({ route, status, params, redirect, ctx }) => {
        const plainCtx = ctx.toObject();
        server && dispatch(end({ route, status, params, redirect, isTransition: false, ctx: plainCtx }));
    },
    render: ({ route, status, params, redirect, ctx }) => {
        const plainCtx = ctx.toObject();
        dispatch(end({ route, status, params, redirect, isTransition: false, ctx: plainCtx }));
    },
    error: ({ error: err, ctx }) => {
        const plainCtx = ctx.toObject();
        dispatch(error({ error: err, ctx: plainCtx }));
    },
    cancel: () => {
        console.warn('router cancel transition');
        // dispatch(cancel());
    }
});
