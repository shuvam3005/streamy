import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import {
	FETCH_STREAM,
	FETCH_STREAMS,
	CREATE_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
	isSignedIn: null,
	userId: null,
};

const signInStateReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SIGN_IN':
			return { ...state, isSignedIn: true, userId: action.payload };
			break;
		case 'SIGN_OUT':
			return { ...state, isSignedIn: false, userId: null };
			break;
		default:
			return state;
	}
};

const streamReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAM:
		case CREATE_STREAM:
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
			break;
		case DELETE_STREAM:
			return _.omit(state, [action.payload]);
			break;
		case FETCH_STREAMS:
			return {
				...state,
				...action.payload.reduce((acc, stream) => {
					acc[stream.id] = stream;
					return acc;
				}, {}),
			};
			break;
		default:
			return state;
	}
};

export default combineReducers({
	isSignedIn: signInStateReducer,
	streams: streamReducer,
	form: reducer,
});
