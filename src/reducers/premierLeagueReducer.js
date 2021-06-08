import {
  GET_ALL_PREMIER_LEAGUE,
  LOADING_ALL_PREMIER_LEAGUE,
  IS_MODAL_OPEN,
} from "../actions/types";

const initialState = {
  premierLeague: null,
  loading: false,
  isModalOpen: false,
};

export default function premierLeague(state = initialState, action) {
  switch (action.type) {
    case LOADING_ALL_PREMIER_LEAGUE:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_PREMIER_LEAGUE:
      return {
        ...state,
        premierLeague: action.payload,
        loading: false,
      };

    case IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload,
      };

    default:
      return state;
  }
}
