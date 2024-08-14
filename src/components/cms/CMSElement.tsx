import React from "react";
import {
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; 
import {SIZES} from '../../constants'
const list = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

const item = {
  show: { opacity: 1, y: -45 },
  hidden: { opacity: 0, y: 10 },
};

const edit = {
  show: { opacity: 1, y: 0, right: -45 },
  hidden: { opacity: 0, y: 10, right: 0 },
};

export default function CMSElement({
  size,
  onEdit,
  onDelete,
  onSizeChange,
  children,
}: {
  size: keyof typeof SIZES;
  onEdit: () => void;
  onDelete: () => void;
  onSizeChange: (size: keyof typeof SIZES) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ position: "relative", height: "100%" }}
      initial="hidden"
      animate="visible"
      whileHover={"show"}
      layout
      variants={list}
      transition={{
        delay: 0.1,
        duration: 0.7,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.div
        variants={item}
        style={{
          gap: 2,
          zIndex: 1999,
          right: 0,
          position: "absolute",
          backgroundColor: "white",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={size}
          exclusive
          size="small"
          aria-label="Platform"
          sx={{ backgroundColor: "white" }}
          onChange={(_, value) => onSizeChange(value)}
        >
          <ToggleButton value="small">sm</ToggleButton>
          <ToggleButton value="medium">md</ToggleButton>
          <ToggleButton value="large">lg</ToggleButton>
        </ToggleButtonGroup>
      </motion.div>
      <motion.div
        variants={edit}
        style={{
          gap: 2,
          zIndex: 1999,
          right: 0,
          position: "absolute",
          backgroundColor: "white",
        }}
      >
        <Stack sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
          <IconButton onClick={onEdit} color="info" value="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <Divider />
          <IconButton onClick={onDelete} color="error" value="medium">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </motion.div>
      {children}
    </motion.div>
  );
}
