import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/input'; // Ajuste o caminho conforme necessário

// Função auxiliar para renderizar o componente com form control
const renderWithFormControl = (props: any) => {
  const TestComponent = () => {
    const { control } = useForm();
    return (
      <Controller
        name={props.name}
        control={control}
        render={({ field }) => <Input {...props} {...field} />}
      />
    );
  };

  return render(<TestComponent />);
};

describe('Input Component', () => {
  it('should render the label', () => {
    const { getByText } = renderWithFormControl({
      label: 'E-mail',
      name: 'email',
    });

    expect(getByText('E-mail')).toBeTruthy();
  });

  it('should render an error message', () => {
    const { getByText } = renderWithFormControl({
      label: 'E-mail',
      name: 'email',
      error: 'This field is required',
    });

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('should handle text input change', () => {
    const { getByPlaceholderText } = renderWithFormControl({
      label: 'E-mail',
      name: 'email',
      placeholder: 'E-mail',
    });

    const input = getByPlaceholderText('E-mail');
    fireEvent.changeText(input, 'test@example.com');

    expect(input.props.value).toBe('test@example.com');
  });
});
