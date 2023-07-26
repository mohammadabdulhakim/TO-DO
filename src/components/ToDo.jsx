import { Checkbox, IconButton } from "@mui/material";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

import useToDos from "../hooks/useToDos";
import { FiEdit } from "react-icons/fi";
import useClicked from "../hooks/useClicked";

const ToDo = ({ todo }) => {
  const { checkToDo, archiveToDo, deleteToDo } = useToDos();
  const { setClicked } = useClicked();


  const handleUpdate = (id) =>{
    setClicked(`todo-modal+${id}`)
  }

  return (
    <div className="w-full min-h-[70px] bg-second-bg dark:bg-second-dark-bg rounded-lg drop-shadow-lg flex items-center justify-between px-2">
      <div className="flex items-center justify-center">
        <Checkbox
          checked={todo.checked}
          sx={{
            color: "rgb(255 3 39)",
            "&.Mui-checked": {
              color: "rgb(255 3 39)",
            },
          }}
          onClick={() => checkToDo(todo.id)}
        />
        <div className="flex flex-col">
          <span>
            {todo.title.length > 14
              ? todo.title.substring(0, 14) + "..."
              : todo.title}
          </span>
          <span className="text-neutral-500 font-light text-[14px] ml-1.5">
            {todo.desc.length > 18
              ? todo.desc.substring(0, 18) + "..."
              : todo.desc}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center md:flex-row flex-col">
          <IconButton onClick={() => handleUpdate(todo.id)}>
            <FiEdit className="dark:text-white" />
          </IconButton>
        {!todo.checked && (
          <IconButton onClick={() => archiveToDo(todo.id)}>
            {todo.archivedAt ? <BiArchiveOut className="dark:text-white" /> : <BiArchiveIn className="dark:text-white" />}
          </IconButton>
        )}
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => deleteToDo(todo.id)}
        >
          <AiOutlineDelete  />
        </IconButton>
      </div>
    </div>
  );
};

export default ToDo;
