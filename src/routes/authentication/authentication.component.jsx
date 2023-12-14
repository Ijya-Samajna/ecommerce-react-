import SignupForm from '../../components/sign-up-form/sign-up-form.component';
import SigninForm from '../../components/sign-in-form/sign-in-form.component';
import {AuthenticationContainer} from './authentication.styles';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SigninForm />
      <SignupForm />
    </AuthenticationContainer>
  )
}

export default Authentication;