import BuilderPage from "@/components/cv-builder/builder";
import {DndProvider} from "@/context/dnd-provider";
import {DownloadIcon} from "@/components/svgs/svgs";
import CircularButton from "@/components/general/circle-btn";

export default async function CVBuilderPage({ params }) {
    const { resumeId } = await params;

    return (
        <DndProvider>
            <div className="relative">

                {/* Main Content */}
                <BuilderPage id={resumeId}/>
            </div>
        </DndProvider>
    );
}
