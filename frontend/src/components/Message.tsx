import { Alert, AlertProps } from 'react-bootstrap';

type MessageProps = AlertProps & {
  children?: React.ReactNode;
};

const Message: React.FC<MessageProps> = ({ children, ...props }) => {
  return (
    <Alert variant={'info' || props.variant} {...props}>
      {children}
    </Alert>
  );
};

export default Message;
