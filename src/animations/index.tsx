import React from 'react';
import { motion } from 'framer-motion';

interface SimpleAnimationProps {
  children: JSX.Element;
}

interface AnimationWithDurationProps {
  children: JSX.Element;
  duration: Number;
}

export const OpacityScaleFull = (props: SimpleAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {props.children}
    </motion.div>
  );
};

export const OpacityScaleMedium = (props: SimpleAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.8, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {props.children}
    </motion.div>
  );
};

export const OpacityScaleMain = (props: SimpleAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {props.children}
    </motion.div>
  );
};

export const OpacityDelayStepper = (props: SimpleAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
};

export const Opacity = (props: AnimationWithDurationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: props.duration }}
    >
      {props.children}
    </motion.div>
  );
};

export const UpAndDown = (props: SimpleAnimationProps) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [4, 0, 4] }}
      transition={{
        repeat: Infinity,
        type: 'tween',
      }}
    >
      {props.children}
    </motion.div>
  );
};
