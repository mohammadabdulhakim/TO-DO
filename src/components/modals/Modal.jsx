import { useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";
import CloseButton from "../buttons/CloseButton";


const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
      setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(()=>{
        if(disabled) return;

        setShowModal(false)
        setTimeout(()=>{
            onClose();
        },300)
    },[disabled,onClose])
    
    const handleSubmit = useCallback(()=>{
        if(disabled) return;
  
        onSubmit();
    }
      ,[onSubmit,disabled])
    
      const handleSecondaryAction = useCallback(()=>{
        if(disabled || !secondaryAction) return;

        secondaryAction();
      },[disabled,secondaryAction])


      
  if(!isOpen) return null;
  return (
    <>
    <div className={`z-50 fixed flex items-center justify-center overflow-x-hidden overflow-y-auto inset-0 focus:outline-none outline-none bg-neutral-800/40 dark:bg-neutral-400/40 ${showModal? "backdrop-blur-[3px] opacity-100":"backdrop-blur-0 opacity-0"}`}>
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto scale-90">
            {/* CONTENT */}
            <div className={`translate duration-300 h-full ${showModal? "translate-y-0":"translate-y-full"}`}>
                <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-main-bg dark:bg-main-dark-bg outline-none focus:outline-none">
                    {/* HEADER */}
                    <div className="flex items-center p-4 rounded-t justify-center relative border-b-[1px] border-slate-400">
                        <CloseButton handleClose={handleClose} />
                        <div className="text-lg font-semibold">
                            {title}
                        </div>
                    </div>
                        {/* BODY */}
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>

                        {/* FOOTER */}

                        <div className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryActionLabel &&(
                                    <Button label={secondaryActionLabel} disabled={disabled} action={handleSecondaryAction} outline />
                                )}
                                <Button label={actionLabel} disabled={disabled} action={handleSubmit} isLoading={disabled} />
                            </div>
                            {footer}
                        </div>
                </div>
            </div>
        </div>
    </div>   
    </>
  )
}

export default Modal