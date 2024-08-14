import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import invariant from "tiny-invariant";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
const list = {
  visible: { rotate: 2 },
  hidden: { scale: 1 },
};

interface IProps {
  id: string;
  children: React.ReactNode;
}
export default function Draggable({ children, id }: IProps) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return draggable({
      element,
      onDrag: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
      getInitialData: () => ({ id }),
    });
  }, [id]);

  return (
    <div ref={ref} style={{ height: "100%" }}>
      <motion.div
        style={{ height: "100%", cursor: "pointer" }}
        animate={isDragging ? { opacity: 0.3 } : {}}
        transition={
          isDragging
            ? {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : {}
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
