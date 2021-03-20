import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { BaseModalBackground, ModalProvider } from 'styled-react-modal';
import { motion, AnimatePresence } from 'framer-motion';

const StyledModal = styled(Modal)<any>`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition: all 0.3s ease-in-out;
  opacity: ${(p) => p.opacity};
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
  background-color: rgba(202, 202, 202, 0.5);
  /* background-color: red; */
`;

const ModalContainer = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalComponent = ({ openModal, setOpenModal, children }: any) => {
  const [opacity, setOpacity] = useState(0);

  const toggleModal = (e: any) => {
    setOpacity(0);
    setOpenModal(!openModal);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  };

  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <StyledModal
        isOpen={openModal}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <AnimatePresence>
          {openModal && (
            <ModalContainer
              initial={{ y: '10px', opacity: 0 }}
              animate={{ y: '0px', opacity: 1 }}
              exit={{ y: '-20px', opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </ModalContainer>
          )}
        </AnimatePresence>
      </StyledModal>
    </ModalProvider>
  );
};

export default ModalComponent;
