 // inputOTP.js
import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef((props, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center has-[:disabled]:opacity-50",
      props.containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", props.className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef((props, ref) => (
  <div ref={ref} className={cn("flex items-center justify-center", props.className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef((props, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[props.index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-16 w-16 items-center justify-center border border-input text-lg transition-all rounded-md mr-2",
        isActive && "ring-2 ring-ring ring-offset-background",
        props.className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

// const REGEXP_ONLY_DIGITS_AND_CHARS = /^[a-zA-Z0-9]+$/;

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
