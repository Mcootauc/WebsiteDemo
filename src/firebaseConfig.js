import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCofKD7Fah9tGa3PXbuLQ1j3IGzQ_fRo2o',
    authDomain: 'aswebdemo.firebaseapp.com',
    projectId: 'aswebdemo',
    storageBucket: 'aswebdemo.appspot.com',
    messagingSenderId: '586611298914',
    appId: '1:586611298914:web:4861115002f95603d1373b',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);