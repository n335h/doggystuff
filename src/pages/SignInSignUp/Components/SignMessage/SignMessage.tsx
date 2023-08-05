interface SignMessageProps {
    message: string;
    signUpRedirect: boolean;
  }
  
  function SignMessage({ message, signUpRedirect }: SignMessageProps) {
    return (
      <div id={signUpRedirect ? "sign-in-message-success" : "sign-in-message-failure"}>
        <h3>{message}</h3>
      </div>
    );
  }

export default SignMessage;