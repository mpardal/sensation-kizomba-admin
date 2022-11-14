import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA5vg6I5Vofxei2fV4Qq5JX1d5MF2T7yO4',
  authDomain: 'sensation-kizomba.firebaseapp.com',
  projectId: 'sensation-kizomba',
  storageBucket: 'sensation-kizomba.appspot.com',
  messagingSenderId: '548463677417',
  appId: '1:548463677417:web:3898a736235566b7488578',
}

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const storage = getStorage(app)
