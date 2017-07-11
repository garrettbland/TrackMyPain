import * as firebase from 'firebase';
//config
import Config from '../config';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  databaseURL: Config.FIREBASE_DATABASE_URL,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp
