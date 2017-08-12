import * as type from '../actions/actionTypes';

const initialState = {
  cards: null
};

export default function cards(state = initialState, action = {}) {
  switch (action.type) {
    case type.ADD_CARDS:
      return {
        ...state,
        cards: action.cards
      };
    default:
      return state;
  }
}
