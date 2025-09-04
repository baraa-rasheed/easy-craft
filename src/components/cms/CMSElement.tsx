import React from "react";
import { motion } from "framer-motion";
import { SIZES } from "../../constants";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

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
}: Readonly<{
  size: keyof typeof SIZES;
  onEdit: () => void;
  onDelete: () => void;
  onSizeChange: (size: keyof typeof SIZES) => void;
  children: React.ReactNode;
}>) {
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
      <motion.div variants={item} className="bg-card shadow rounded absolute right-0 z-10">
        <ToggleGroup
          type="single"
          defaultValue={size}
          onValueChange={(value: keyof typeof SIZES) => onSizeChange(value)}
        >
          <ToggleGroupItem value="col-span-4">sm</ToggleGroupItem>
          <ToggleGroupItem value="col-span-6">md</ToggleGroupItem>
          <ToggleGroupItem value="col-span-12">lg</ToggleGroupItem>
        </ToggleGroup>
      </motion.div>
      <motion.div
        variants={edit}
        style={{
          gap: 2,
          zIndex: 1999,
          right: 0,
          position: "absolute", 
        }}
      >
        <div className="bg-card rounded flex flex-col gap-1 shadow">
          <Button onClick={onEdit} size={'sm'}>
            <Edit2Icon />
          </Button>
          <Button variant={"destructive"} onClick={onDelete} size={'sm'}>
            <Trash2Icon />
          </Button>
        </div>
      </motion.div>
      {children}
    </motion.div>
  );
}
