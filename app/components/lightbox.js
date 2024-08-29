'use client'

import { useState, useRef } from "react";
import { motion, useDomEvent } from "framer-motion";

import './lightbox.css'

const transition = {
    type: "spring",
    damping: 25,
    stiffness: 120
  };
  

export default function LightBox({height, width, src, alt}) {
    const [isOpen, setOpen] = useState(false);
    useDomEvent(useRef(typeof window === "undefined" ? null : window), "scroll", () => isOpen && setOpen(false));

    return <div className={`image-container ${isOpen ? "open" : ""}`}>
    <motion.div
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={transition}
      className="shade"
      onClick={() => setOpen(false)}
    />
    <motion.img
      src={src}
      alt={alt}
      onClick={() => setOpen(!isOpen)}
      layout
      transition={transition}
    />
  </div>
}