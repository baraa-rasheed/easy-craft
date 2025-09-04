import React from "react";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Main = ({  ...props }: MainProps) => {
  return (
      <main className="flex flex-col flex-1 min-h-0 px-6"
      {...props}
    />
  );
};

Main.displayName = "Main";
