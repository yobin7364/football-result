import axios from "axios";

import { GET_ALL_PREMIER_LEAGUE, LOADING_ALL_PREMIER_LEAGUE } from "./types";

//get all premier league club scores
export const getAllPremierLeague = () => (dispatch) => {
  //for loading sign and the load value of this disptach will be changed when axios dispatch occurs
  dispatch(setAllPremierLeagueLoading());

  axios
    .get(
      "https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.json"
    )
    .then((res) =>
      dispatch({
        type: GET_ALL_PREMIER_LEAGUE,
        payload: res,
      }).catch((err) => {
        //when no premier league data is not found send empty object
        dispatch({
          type: GET_ALL_PREMIER_LEAGUE,
          payload: {},
        });
      })
    );
};

//Premier League loading
export const setAllPremierLeagueLoading = () => {
  return {
    type: LOADING_ALL_PREMIER_LEAGUE,
  };
};
