import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Link, useLocation } from "react-router";
import { LayoutDashboardIcon } from "lucide-react";

interface Props {
  title: string;
  description?: React.JSX.Element;
  icon?: React.JSX.Element;
}

export default function Placeholder() {
  const location = useLocation();
  return (
    <div className="flex self-start gap-8 w-full flex-col h-full">
      <motion.div
        initial={{ x: -30, opacity: 0.3 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring" }}
        className="lg:w-2xl "
      >
        <Alert>
          <LayoutDashboardIcon />
          <AlertTitle>No Elements found here :(</AlertTitle>
          <AlertDescription>
            <span>
              You can navigate to easy-craft to add elements to this page.
              <Link
                className="px-2 text-primary"
                to={`/cms${location.pathname}`}
              >
                Go To easy-craft
              </Link>
            </span>
          </AlertDescription>
        </Alert>
      </motion.div>
    </div>
  );
}
