const ContactSpace = ({isEmpty = false,width=37})=> {

    return <span className={`spacer block ml-0 mr-0 `}
    style={{width: `${width}px`}}
    >
        <span className="text-black flex justify-center items-center h-5 pt-0.5">{isEmpty ? '': '|'}</span>
                                </span>
}
export default ContactSpace;