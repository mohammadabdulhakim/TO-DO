import { BiDollar } from "react-icons/bi";

const Input= ({
id,
label,
type,
disabled,
formatPrice,
register,
errors,
}) => {

  
  return (
    <div
    className="w-full relative"
    >
        <input type={type} id={id} disabled={disabled} required {...register(id)} placeholder=" " className={`
        bg-secondary-bg dark:bg-secondary-dark-bg
        peer w-full p-3 pt-6 font-normal border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 
        ${errors[id]? "border-rose-500":"border-neutral-300"}
        ${errors[id]? "focus:border-rose-500":"focus:border-black"}
        `} />

        <label className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3.5
        top-5
        z-10
        origin-[0]
        ${formatPrice? "left-9":"left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id]?"text-rose-500":"text-zinc-400"}
        `}>
            {label}
        </label>
    </div>
  )
}

export default Input