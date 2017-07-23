export const YES_MEDS = 'YES_MEDS';
export const NO_MEDS = 'NO_MEDS';
export const EDIT_MEDS = 'EDIT_MEDS';
export const SHOW_MESSAGE_MEDS = 'SHOW_MESSAGE_MEDS';
export const SET_PAIN = 'SET_PAIN';
export const SET_RATE_MEDS = 'SET_RATE_MEDS';
export const SHOW_RATE_MODAL = 'SHOW_RATE_MODAL';
export const NOTIFICATION_CHANGE = 'NOTIFICATION_CHANGE';
export const REMINDER_INTERVAL_CHANGE = 'REMINDER_INTERVAL_CHANGE';

export function addMeds(test){
  if(test){
    return {
      type:YES_MEDS
    }
  }else {
    return {
      type:NO_MEDS
    }
  }
}

export function editMeds(medName,medAmount,medID){
  return {
    MedNamePayload:medName,
    MedAmountPayload:medAmount,
    MedIDPayload:medID,
    type:EDIT_MEDS
  }
}

export function showMessageMeds(showMessage,alertTitle,alertText,alertColor){
  return {
    showMessageMed:showMessage,
    alertTitle:alertTitle,
    alertText:alertText,
    alertColor:alertColor,
    type:SHOW_MESSAGE_MEDS,
  }
}

export function setPain(pain,color) {
  return {
    pain:pain,
    color:color,
    type:SET_PAIN
  }
}

export function setRateMeds(medsArray){
  return {
    medsArrayPayload:medsArray,
    type:SET_RATE_MEDS
  }
}

export function showRateModal(visible){
  return {
    visible:visible,
    type:SHOW_RATE_MODAL,
  }
}

export function notificationsChange(value){
  return {
    value:value,
    type:NOTIFICATION_CHANGE
  }
}
