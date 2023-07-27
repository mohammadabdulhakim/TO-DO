import { useEffect, useState } from "react";
import useToDos from "../hooks/useToDos"
import ToDo from "../components/ToDo";


const ToDoPage = () => {
  const { toDos } = useToDos();
  const [containers, setContainers] = useState([])
  

  useEffect(()=>{
    let newContainers = [
      {
        title: 'To-Do',
        bg:"#ecff42",
      },
      {
        title: 'Done',
        bg:"#42ff52",
      },
      {
        title: 'Archived',
        bg:"#969696",
      },
    ];

    newContainers[0].toDos = toDos.filter((todo)=> !todo.checked && !todo.archivedAt )
    newContainers[1].toDos = toDos.filter((todo)=> todo.checked )
    newContainers[2].toDos = toDos.filter((todo)=> !todo.checked && todo.archivedAt )

    setContainers(newContainers)
  },[toDos])

  return (
    <div className="flex items-start justify-center md:flex-row flex-col gap-3 p-4 md:p-10">
      {containers.map((container)=>(
          <div key={container.title} className="w-full flex items-center justify-center flex-col gap-1">
            <h3 className="text-2xl font-bold">
              {container.title}
            </h3>
            <div style={{backgroundColor:container.bg}} className="border-2 border-second-color rounded-md min-h-[300px] max-h-[500px] overflow-y-auto w-full flex items-center flex-col p-4 gap-2.5">
              {
                container.toDos.map((todo)=>(
                  <ToDo key={todo.id} todo={todo} />
                ))
              }
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ToDoPage