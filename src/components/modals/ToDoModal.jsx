import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Modal from "./Modal";
import Input from "../inputs/Input.jsx";
import { toast } from "react-hot-toast";
import useClicked from "../../hooks/useClicked";
import useToDos from "../../hooks/useToDos";
import Heading from "../Heading";
import Textarea from "../inputs/Textarea";

const ToDoModal = () => {
  const { clicked, closeAllClicked } = useClicked();
  const { toDos, addToDo } = useToDos();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      title: yup.string().required().min(3).max(60),
      desc: yup.string().required().min(10).max(300),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    let newToDo = {
        ...data,
        id: toDos.length + 1,
        writtenAt: Date.now(),
        checked:false,
        finishedAt:null,
        archivedAt:null,
    }
    addToDo(newToDo)

    setValue("desc","")
    setValue("title","")
    closeAllClicked()
    setIsLoading(false)
};

  useEffect(() => {
    const errorsKeys = Object.keys(errors);
    if (errors && errorsKeys.length > 0) {
      const firstError = errors[errorsKeys[0]];
      toast.error(firstError?.message);
    }
  }, [errors]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={"New To-Do"} subtitle={"Add your awesome new task."} />
      <Input
        id="title"
        label="Title"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Textarea
        id="desc"
        label="Task Description"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      disabled={isLoading}
      isOpen={clicked === "todo-modal"}
      title="New To-Do"
      actionLabel="Add it"
      onClose={closeAllClicked}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ToDoModal;
