import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignInContainer, ButtonsContainer} from './sign-in-form.styles';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const defaultFormFields = {
  email: '',
  password: ''
}

const SigninForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const signInWithGoogle = async () => {
    // const { user } = await signInWithGooglePopup(); //getting response.user by object destructuring of api response
    await signInWithGooglePopup(); //this will change the state of auth and trigger the observer onAuthStateChanged
    // const userDocRef = await createUserDocumentFromAuth(user); //we don't need this as we have a listener in firebase that is checking for auth. So we used useEffect on our context variable to perform this function whenever the value of auth changes i.e. the user logs in or logs out
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(  //getting response.user by object destructuring of api response
        email,
        password
      );//this will change the state of auth and trigger the observer onAuthStateChanged

      // await createUserDocumentFromAuth(user); //passing additional information of display name
      resetFormFields();
    } catch (error) {
        switch (error.code) {
          case 'auth/invalid-credential':
            alert('incorrect email or password');
            break;
          default:
            console.log(error);
        }
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitForm}>

        <FormInput
          label='Email'
          inputOptions={{
            type: "email",
            required: true,
            name: "email",
            value: email,
            onChange: onChangeHandler
          }}
        />

        <FormInput
          label='Password'
          inputOptions={{
            type: "password",
            required: true,
            name: "password",
            value: password,
            onChange: onChangeHandler
          }}
        />
        <ButtonsContainer>
          <Button
            buttonProps={{
              type: 'submit'
            }}>
            Sign in
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            buttonProps={{
              type: 'button',
              onClick: signInWithGoogle
            }}>
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SigninForm;