import { IconButton } from '@mui/material'
import { IoMdClose } from 'react-icons/io'

const CloseButton = ({ handleClose }) => {
    return (
        <IconButton onClick={handleClose} style={{ position: "absolute", left: "30px" }} aria-label="close" color="error">
            <IoMdClose size={22} />
        </IconButton>
    )
}

export default CloseButton