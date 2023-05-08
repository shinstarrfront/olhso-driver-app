import { createContext, Dispatch, SetStateAction, useState, PropsWithChildren } from 'react';

interface SignInProviderProps extends PropsWithChildren {}

interface SignInContextType {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const SignInContext = createContext<SignInContextType>({
  phoneNumber: '',
  setPhoneNumber: () => {},
  password: '',
  setPassword: () => {},
 
});

function SignInProvider(props: SignInProviderProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');


  return (
    <SignInContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        password,
        setPassword,
      }}
    >
      {props.children}
    </SignInContext.Provider>
  );
}

export { SignInContext, SignInProvider };
