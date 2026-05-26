import useAppContext from "@/hooks/useAppContext";

const TextInput = ({
                       isRequired = true,
                       hint,
                       type = "text",
                       title,
                       name,
                       onChange,
                       value,
                       ...props
                   }) => {

    const { globalRefs } = useAppContext();

    return (
        <div {...props}>
            <label
                htmlFor={name}
                className="text-primaryBlack mb-[2.5px] ml-[11px] inline-block w-full text-[14px] font-bold md:text-[15px]"
            >
                <span>{title}</span>
                <span className="ml-2 text-[11px] text-gray-400">
                    {isRequired ? "*" : "optional"}
                </span>
            </label>

            <div className="relative flex items-center">
                <input
                    name={name}
                    id={name}
                    type={type}
                    placeholder={hint}
                    ref={(el) => {
                        globalRefs.current[name] = el;
                    }}
                    value={value}
                    onChange={onChange}
                    className="h-12 w-full appearance-none rounded-lg text-base leading-normal shadow-none outline-none md:text-[17px] font-sans m-0 placeholder-inputPlaceholder bg-inputBackground border border-solid border-inputBorder text-inputText p-2.5"
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default TextInput;
