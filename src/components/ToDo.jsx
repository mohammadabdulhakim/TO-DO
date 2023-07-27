import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

import useToDos from "../hooks/useToDos";
import { FiEdit } from "react-icons/fi";
import useClicked from "../hooks/useClicked";
import { abbText } from "agere";
import moment from "moment";
import { useMemo } from "react";

const ToDo = ({ todo }) => {
  const { checkToDo, archiveToDo, deleteToDo } = useToDos();
  const { setClicked } = useClicked();

  const handleUpdate = () => {
    setClicked(`todo-modal+${todo.id}`);
  };

  const toolTipTitle = useMemo(() => {
    if (!todo.checked && !todo.archivedAt) return `Written from ${moment(todo.writtenAt).fromNow()}`
    if (todo.checked)                      return `Done from ${moment(todo.finishedAt).fromNow()}`
    if (!todo.checked && todo.archivedAt)  return `Archived from ${moment(todo.archivedAt).fromNow()}`
  }, [todo])

  return (
    <Tooltip title={toolTipTitle} arrow>
      <div className="w-full min-h-[70px] bg-second-bg dark:bg-second-dark-bg rounded-lg drop-shadow-lg flex items-center justify-between px-2">
        <div className="flex items-center justify-center w-full">
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
          <div className="flex flex-col w-full cursor-pointer" onClick={handleUpdate}>
            <span>{abbText(todo.title, 14)}</span>
            <span className="text-neutral-500 dark:text-neutral-300 font-light text-[14px] ml-1.5">
              {abbText(todo.desc, 18)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center md:flex-row flex-col">
          <IconButton onClick={handleUpdate}>
            <FiEdit className="dark:text-white" />
          </IconButton>
          {!todo.checked && (
            <IconButton onClick={() => archiveToDo(todo.id)}>
              {todo.archivedAt ? (
                <BiArchiveOut className="dark:text-white" />
              ) : (
                <BiArchiveIn className="dark:text-white" />
              )}
            </IconButton>
          )}
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteToDo(todo.id)}
          >
            <AiOutlineDelete />
          </IconButton>
        </div>
      </div>
    </Tooltip>
  );
};

export default ToDo;
