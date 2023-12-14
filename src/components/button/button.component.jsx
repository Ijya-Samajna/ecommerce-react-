import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => { //function to return a button type from the styles file based on the BUTTON_TYPE_CLASSES key values
  return ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType])
}
  ;

const Button = ({ children, buttonType, buttonProps }) => { //children to render contents inside a button, whether it is plain text, or p tag, or img tag. buttonType to set its appropriate CSS class. buttonProps object to destructure to set the attributes of the button dynamically
  // return (
  //   <button
  //     className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
  //     {...buttonProps}
  //   >
  //     {children}
  //   </button>
  // );
  const CustomButton = getButton(buttonType);
  return <CustomButton {...buttonProps}>{children}</CustomButton>;
};

export default Button;
