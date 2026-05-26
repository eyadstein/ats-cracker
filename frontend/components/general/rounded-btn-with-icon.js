import React from 'react';

const RoundedBtnWithIcon = ({
                                text = "",
                                icon: Icon,
                                iconSize = 12,
                                onClick,
                                className,
                                iconColor = "white",
                            }) => {
    return (
        <div>
            <button
                type="button"
                className={`
                border-none cursor-pointer appearance-none touch-manipulation flex
                items-center justify-center focus-visible:outline-blue-600 font-bold hover:opacity-80
                rounded-full ${className}
            `}
                onClick={onClick}>
                <span className="hidden md:inline text-[15px] font-bold">{text}</span>
                {Icon && (
                    <Icon
                        className="ml-2"
                        style={{
                            fontSize: `${iconSize}px`,
                            color: iconColor
                        }}
                    />
                )}
            </button>
        </div>
    );
};

export default RoundedBtnWithIcon;
