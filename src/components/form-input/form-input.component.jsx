import {FormInputLabel, Input, Group} from './form-input.styles';

const FormInput = ({ label, inputOptions }) => { // destructuring the inputOptions object below as ...inputOptions to set the attributes, this allows us to set as many attributes as needed from the parent component, making it more dynamic
  return (
    <Group>
      <Input {...inputOptions} />
      {label && ( //checking if there is a label and then appending the label tag. Kind of like ngIf
        <FormInputLabel shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
