import { MdAdd } from "react-icons/md";

const OptionsItem = ({ title,onClick }) => {
    return (
        <div
            onClick={onClick}
            className={"bg-inputBackground text-inputPlaceholder flex w-auto cursor-pointer items-center justify-center rounded-lg p-2 pr-[10px] text-sm hover:opacity-80 mb-2 mr-2 text-gray-500"}>
            <MdAdd className={""} style={{fontSize:"16px",color:"#910e66"}}/>
            <span className={"ml-1 whitespace-nowrap text-gray-500"}>{title}</span>
        </div>
    );
};

export default OptionsItem;