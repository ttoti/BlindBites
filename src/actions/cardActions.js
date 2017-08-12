import * as types from './actionTypes';

export function addCards(cards){
  return {
    type: types.ADD_CARDS,
    cards
  };
}
