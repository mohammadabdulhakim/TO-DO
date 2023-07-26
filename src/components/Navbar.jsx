import Tooltip from "@mui/material/Tooltip";
import ToggleDark from "./buttons/ToggleDark";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
  const navbarItems = [
    {
      label: "Home",
      icon: FiHome,
      action: ()=>navigate("/")
    },
    {
      label: "New Task",
      icon: IoMdAdd,
    },
    {
      label: "Weather",
      icon: TiWeatherPartlySunny,
      action: ()=> navigate("/weather")
    },
  ];
  
  return (
    <div className="bg-second-bg dark:bg-second-dark-bg w-[380px] max-w-[90vw] h-[60px] rounded-full drop-shadow-lg fixed bottom-[40px] right-[50%] translate-x-[50%] flex items-center justify-evenly">
      {navbarItems.map((item) => (
        <Tooltip title={item.label} arrow>
          <button className="hover:bg-gray-500/30 rounded-full p-2" onClick={item?.action}>
            {<item.icon size={25} className="text-black dark:text-white" />}
          </button>
        </Tooltip>
      ))}
      <ToggleDark />
    </div>
  );
};

export default Navbar;
