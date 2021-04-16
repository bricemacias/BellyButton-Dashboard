import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const NewTalent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  text-align: center;
  padding: 35px 50px 35px;
  color: ${(p) => p.theme.colors.secondary.blue};
`;

const NewTalentComponent = () => {
  return (
    <NewTalent
      initial={{ y: '5px' }}
      animate={{ y: '0px' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      This Talent has not enough history yet, come back next month 🙂
    </NewTalent>
  );
};

export default NewTalentComponent;
