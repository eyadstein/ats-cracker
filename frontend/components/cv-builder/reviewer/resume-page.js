import useAppContext from "@/hooks/useAppContext";

const ResumePage = ({children, isListItemPreview, data, ...props}) => {
    return (
        <div

            className="notranslate resumePage"
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "rgb(255, 255, 255)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: "flex",
                flexDirection: "column",
                lineHeight: "19px",
                fontSize: "11.5pt",
                fontFamily: `"Zilla Slab", "Noto Sans", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR", "Noto Sans Arabic", "Noto Sans Devanagari", "Noto Sans Hebrew", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", "Noto Sans Gujarati", "Noto Sans Kannada", "Noto Sans Malayalam", "Noto Sans Bengali", "Noto Sans Gurmukhi", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Myanmar", "Noto Sans Oriya", "Noto Sans Sinhala", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Armenian", "Noto Sans Display", "Noto Sans Math", "Noto Sans Symbols", sans-serif`,
                fontStretch: "normal",
                textRendering: "geometricprecision",
                fontVariantLigatures: "none",
                borderRadius: "4px",
                marginBottom: "32px",
                width: "210mm",
                minWidth: "210mm",
                minHeight: "297mm",
            }}
        >

            <div style={{
                display: "flex",
                flexGrow: 1,
                width: "100%",
                backgroundColor: "transparent",
                borderWidth: "0mm",
                borderStyle: "solid",
                borderColor: "transparent"
            }}>

                <div style={{
                    display: "flex",
                    flexGrow: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    borderWidth: "0mm",
                    borderStyle: "solid",
                    borderColor: "transparent"
                }}>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        paddingTop: "13.4708mm",
                        paddingBottom: " 9.2375mm",
                        paddingLeft: "16mm",
                        paddingRight: "16mm",
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "rgb(0, 0, 0)"
                    }}>
                        <div id={"resume"} ref={props.ref}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;