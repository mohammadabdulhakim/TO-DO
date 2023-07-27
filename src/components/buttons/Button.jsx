import { CircularProgress } from "@mui/material";
import { useMemo } from "react";


const Button = ({
  action,
  label,
  type = "button",
  outline,
  small,
  icon: Icon,
  disabled,
  isLoading
}) => {


  const borderColor = useMemo(() => (
    outline ? "border-second-color" : "border-main-color"
  ), [outline])

  return (
    <button disabled={disabled} type={type}
      onClick={action}
      style={isLoading?{width:"fit-content",borderRadius:"9999px",margin:"auto"}:{}}
      className=
      {`
      text-white
        text-center
        opacity-90
        hover:opacity-100
        active:scale-[0.96]
        rounded-md
        border-2
        transition-all
        ${borderColor}
        ${small ? "px-4 p-1 font-normal" : "p-2 w-full text-lg font-semibold"}
        ${outline ? "bg-transparent hover:bg-second-color/10" : "bg-main-color hover:bg-main-color/80"}
        ${disabled ? "bg-neutral-700 hover:bg-neutral-700 border-neutral-700 text-white cursor-not-allowed" : ""}
        flex items-center justify-center gap-1.5
      `}
    >
      {isLoading ?
        <CircularProgress color="inherit" />
        :
        <>
          {Icon &&
            <Icon
              size={small ? 22 : 26}
            />
          }
          <span>
            {label}
          </span>
        </>
      }
    </button>
  )
}

export default Button