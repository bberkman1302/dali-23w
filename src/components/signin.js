import './signin.css';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBakmTmUQrc2u2ddnZX6SyS1UIhPG9vpUo",
  authDomain: "landingpage-3bfc2.firebaseapp.com",
  projectId: "landingpage-3bfc2",
  storageBucket: "landingpage-3bfc2.appspot.com",
  messagingSenderId: "970027971672",
  appId: "1:970027971672:web:17c8735674614cfe12462d",
  measurementId: "G-TXRF9M9X5F"
};

initializeApp(firebaseConfig);

function SignIn(props) {

  const {setUsername} = props;
  const [user, setUser] = useState(null);

  //sets the user data if signing in, otherwise sets to NULL
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((userdata) => {
      if (userdata) {
        setUser(userdata);
        setUsername(userdata.displayName)
      } else {
        setUser(null);
        setUsername(null)
      }
    });
    return unsubscribe;
  }, []);
  

  //helper function to sign in with google
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider) //initiates google popup
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userdata = result.user;
        console.log(userdata.displayname)
      })
      .catch((error) => {
        console.log(error)
      });
  };  

  //helper function to sign out
  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
      setUsername(null)
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      {user ? (
      <>
        <div className = "signin" onClick={handleSignOut}>Sign Out</div>
      </>
      ) : (
        <div className = "signin" onClick={handleSignIn}>Sign In</div>
      )}
    </div>
  );
}

export default SignIn;
