import { initializeApp} from 'firebase/app';
import  {getFirestore} from '@firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
        apiKey: "AIzaSyCsWgPGat4eOh-euqMdyeL1vR3KdAkhVyA",
        authDomain: "capg-e49b1.appspot.com",
        projectId: "capg-e49b1",
        storageBucket: "capg-e49b1.appspot.com",
        messagingSenderId: "854542942318",
        appId:"1:854542942318:android:0e8c3cc58ae869c71ea67f"
}

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const firestore = getFirestore(app);