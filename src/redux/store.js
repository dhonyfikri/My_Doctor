import {createStore} from 'redux';

const initialStore = {
  loading: false,
  basicLoading: false,
};

const reducer = (state = initialStore, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_BASIC_LOADING') {
    return {
      ...state,
      basicLoading: action.value,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
