import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignUpContainer} from './sign-up-form.styles';
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignupForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(  //getting response.user by object destructuring of api response
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName }); //passing additional information of display name
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitForm}>
        <FormInput
          label='Display name'
          inputOptions={{
            type: "text",
            required: true,
            name: "displayName",
            value: displayName,
            onChange: onChangeHandler
          }}
        />

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

        <FormInput
          label='Confirm password'
          inputOptions={{
            type: "password",
            required: true,
            name: "confirmPassword",
            value: confirmPassword,
            onChange: onChangeHandler
          }}
        />

        <Button
          buttonProps = {{
            type: 'submit'
          }}>
          Sign up
        </Button>
      </form>
    </SignUpContainer>
  )
}

export default SignupForm;