"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const MotionComponent = ({
  as = "div",
  variants,
  children,
  className,
  href,
  onClick,
  src,
  ...rest
}) => {
  const shouldbeReduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      href={href}
      src={src}
      onClick={onClick}
      variants={shouldbeReduceMotion ? "visible" : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default MotionComponent;
