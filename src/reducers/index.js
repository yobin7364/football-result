import { combineReducers } from "redux";
import premierLeagueReducer from "./premierLeagueReducer";

export default combineReducers({
  premierLeague: premierLeagueReducer,
});
