import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Title = styled.h3`
  /* font-family: 'Roboto Mono', monospace; */
  color: ${(p) => p.theme.colors.grey.dark3};
  font-weight: 100;
  font-size: 5rem;
  letter-spacing: 0.8rem;
  margin: -7rem auto 0;
  /* font-style: oblique 10deg; */
`;
const Welcome = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.7 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <Title>Welcome back</Title>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
