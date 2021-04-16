import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ErrorProps {
  error: Error | null;
}

const ErrorMessage = styled.p`
  text-align: center;
  color: ${(p) => p.theme.colors.tertiary.main};
`;

const Error = ({ error }: ErrorProps) => (
  <motion.div
    initial={{ color: 'orangered', opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.1 }}
  >
    <ErrorMessage>{error && error.message}</ErrorMessage>
    {/* <p>{error && error.message.split(':')[1].trim()}</p> */}
  </motion.div>
);

export default Error;
