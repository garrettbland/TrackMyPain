import {
  YES_MEDS,
  NO_MEDS,
  EDIT_MEDS,
  SHOW_MESSAGE_MEDS,
  SET_PAIN,
  SET_RATE_MEDS,
  SHOW_RATE_MODAL,
  NOTIFICATION_CHANGE,
  REMINDER_INTERVAL_CHANGE
} from '../actions/index.js';


export default function loginReducer(state,action){
  switch (action.type) {
    case EDIT_MEDS:
      return Object.assign({}, state, {user:{medicationName:action.MedNamePayload,medicationAmount:action.MedAmountPayload,medID:action.MedIDPayload}})

    case SHOW_MESSAGE_MEDS:
      return Object.assign({}, state, {user:{showMessageMed:action.showMessageMed,alertTitle:action.alertTitle,alertText:action.alertText,alertColor:action.alertColor}})

    case SET_PAIN:
      return Object.assign({}, state, {user:{pain:action.pain,painBackgroundColor:action.color}})

    case SET_RATE_MEDS:
      return Object.assign({}, state, {user:{medsArray:action.medsArrayPayload}})

    case SHOW_RATE_MODAL:
      return Object.assign({}, state, {user:{showModal:action.visible}})

    case NOTIFICATION_CHANGE:
      return Object.assign({}, state, {user:{notifications:action.value}})
      
    default:
      console.log("Case default fired");
      return Object.assign({}, state, {user:{loggedIn:false}});
  }
}
