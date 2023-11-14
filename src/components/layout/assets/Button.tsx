import PropTypes from 'prop-types';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  [key: string]: any;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="border-2 border-blue-700 bg-blue-700 text-white py-1 w-20 rounded-sm transition ease-in-out delay-550 hover:bg-white hover:text-blue-700 font-semibold mb-2"
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
