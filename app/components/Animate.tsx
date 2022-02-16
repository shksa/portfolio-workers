import { FC } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useLocation } from "remix";

export const Animate: FC = ({children}) => {
  const currentLocation = useLocation();
  return (
    <SwitchTransition>
      <CSSTransition
        key={currentLocation.pathname}
        addEndListener={(node, done) => {
          node.addEventListener("animationend", done, false);
        }}
        classNames={{
          enterActive: "animate-in fade-in slide-in-from-left duration-300",
          exitActive: "animate-out fade-out slide-out-to-right duration-300",
        }}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  )
}