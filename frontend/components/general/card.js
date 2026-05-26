const Card = ({className, children, ...props}) => {
    return <div className={`p-4 w-full  rounded-large bg-white shadow-card ${className}`} {...props}>
        {children}
    </div>


}

export default Card;