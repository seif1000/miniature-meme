import createDataContext from './createDataContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', user: action.payload ,initializing:false};
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { user: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch =>() => {
  auth().onAuthStateChanged((user)=>{
    dispatch({ type: 'signin', payload: user });
    
  });
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async (email, password ) => {
  try {
     const user = await  auth().createUserWithEmailAndPassword(email,password)
     if(user){
        await firestore().collection('Users').doc(user.user.uid).set({email:email})
     }
     dispatch({ type: 'signin', payload: user.user });
  } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        dispatch({
              type: 'add_error',
              payload: 'That email address is already in use!'
        });
      
      }

      if (error.code === 'auth/invalid-email') {
        dispatch({
          type: 'add_error',
          payload: 'That email address is invalid!'
        });
       
      }

      console.log(error)
  }

 
  
};

const signin = dispatch => async (email, password ) => {
  try {
    const user = await  auth().signInWithEmailAndPassword(email,password)
    dispatch({ type: 'signin', payload: user });
 } catch (error) {
     if (error.code == 'auth/user-not-found') {
       dispatch({
             type: 'add_error',
             payload: 'pleas enter a the correct email'
       });
     
     }

     if (error.code == 'auth/wrong-password') {
       dispatch({
         type: 'add_error',
         payload: 'wrong password'
       });
      
     }

     
 }
};


const signout = dispatch => async () => {
  try {
    await auth().signOut()
    dispatch({ type: 'signout' });
  } catch (error) {
     console.log(error)
  }
 
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { user: null, initializing:true, errorMessage: '' }
);
