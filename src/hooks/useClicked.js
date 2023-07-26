import { create as add } from "zustand";


const useClicked = add((set)=>({
    clicked:"",
    setClicked: (clickedNow) => set(()=>({clicked: clickedNow})),
    closeAllClicked: () => set(()=>({clicked:""}))
}))

export default useClicked;