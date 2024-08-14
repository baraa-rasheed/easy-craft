import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { Typography } from "@mui/material";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { AnimatePresence, motion } from "framer-motion";
import { ELEMENT_HEIGHT } from "../../constants";

const idle: State = { type: "idle" };

const isCardOver: State = { type: "is-card-over" };

type State =
  | { type: "idle" }
  | { type: "is-card-over" }
  | { type: "generate-column-preview" };

export default function DropArea({
  id,
  title,
  style,
}: {
  title?: string;
  id: string;
  style?: any;
}) {
  const ref = useRef(null);
  const [state, setState] = useState<State>(idle);

  useEffect(() => {
    const element = ref.current;
    invariant(element);
    dropTargetForElements({
      element: element,
      getData: () => ({ id }),
      onDrop: () => setState(idle),
      onDragLeave: () => setState(idle),
      onDragEnter: () => setState(isCardOver),
      onDragStart: () => setState(isCardOver),
    });
  }, [id]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        height: ELEMENT_HEIGHT,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        ...(style ?? {}),
      }}
    >
      <AnimatePresence>
        {state.type === "is-card-over" && (
          <motion.div
            initial={{
              rotate: "0deg",
              opacity: 0,
              scale: 0.7,
              backgroundColor: "#fff",
            }}
            exit={{
              opacity: 0,
            }}
            animate={{
              rotate: "-2deg",
              opacity: 1,
              scale: 1,
              backgroundColor: "#f1f5f9",
            }}
            transition={{
              delay: 0.1,
              duration: 0.7,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            style={{
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "100%",
            }}
          >
            <Typography variant="h4" textAlign={"center"}>
              {title ?? "Drop your element here..."}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
