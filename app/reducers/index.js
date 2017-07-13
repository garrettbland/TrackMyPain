import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SET_LISTITEM,
  YES_MEDS,
  NO_MEDS,
  EDIT_MEDS,
} from '../actions/index.js';


export default function loginReducer(state,action){
  switch (action.type) {
    case YES_MEDS:
      return Object.assign({}, state, {user:{test:true}})
      console.log("test -> true");

    case NO_MEDS:
      return Object.assign({}, state, {user:{test:false}})
      console.log("test -> false");

    case EDIT_MEDS:
      return Object.assign({}, state, {user:{medicationName:action.MedNamePayload,medicationAmount:action.MedAmountPayload,medID:action.MedIDPayload}})

    default:
      console.log("Case default fired");
      return Object.assign({}, state, {user:{loggedIn:false}});
  }
}
