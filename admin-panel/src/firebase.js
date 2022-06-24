import {initializeApp} from 'firebase/app'
import {getStorage} from "firebase/storage"

const firebaseConfig = {

    apiKey: "AIzaSyAw97jWc3xhmKM_dzDWmdsUXEGX-1ljfls",
  
    authDomain: "netflix-lama-6ed25.firebaseapp.com",
  
    projectId: "netflix-lama-6ed25",
  
    storageBucket: "netflix-lama-6ed25.appspot.com",
  
    messagingSenderId: "304985704724",
  
    appId: "1:304985704724:web:c85feffc8d6ebb06fdda01"
  
  };
  
const firebaseApp=initializeApp(firebaseConfig)

const storage=getStorage(firebaseApp)


export default storage;