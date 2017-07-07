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
      return Object.assign({}, state, {user:{medicationName:action.MedNamePayload,medicationAmount:action.MedAmountPayload}})

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {user:{loggedIn:true}});
      console.log("Case LOGIN_SUCCESS fired");

    case LOGIN_ERROR:
      return Object.assign({}, state, {user:{loginError:true}});
      console.log("Case LOGIN_ERROR fired");

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {user:{loggedIn:false}});
      console.log("Case LOGOUT_SUCCESS fired");

    case SET_LISTITEM:
      return Object.assign({}, state, {user:{selectedRow:action.payload}});
      console.log("Case SET_LISTITEM fired");

    default:
      console.log("Case default fired");
      return Object.assign({}, state, {user:{loggedIn:false}});
  }
}
