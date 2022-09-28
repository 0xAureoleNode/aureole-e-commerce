import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../../utils/firebase/firebase.utils';

import SignUpForm from '../../sign-up-form/sign-up-form.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h4>Sign In Page</h4>
      <button onClick={logGoogleUser}>sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
