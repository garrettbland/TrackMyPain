export const YES_MEDS = 'YES_MEDS';
export const NO_MEDS = 'NO_MEDS';
export const EDIT_MEDS = 'EDIT_MEDS';
export const SHOW_MESSAGE_MEDS = 'SHOW_MESSAGE_MEDS';
export const SET_PAIN = 'SET_PAIN';

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
  console.log('EDIT MEDS ACTION FIRED');
  return {
    MedNamePayload:medName,
    MedAmountPayload:medAmount,
    MedIDPayload:medID,
    type:EDIT_MEDS
  }
}

export function showMessageMeds(showMessage,alertTitle,alertText,alertColor){
  console.log('SHOW MESSAGE MEDS FIRED');
  return {
    showMessageMed:showMessage,
    alertTitle:alertTitle,
    alertText:alertText,
    alertColor:alertColor,
    type:SHOW_MESSAGE_MEDS,
  }
}

export function setPain(pain) {
  return {
    pain:pain,
    type:SET_PAIN
  }
}
