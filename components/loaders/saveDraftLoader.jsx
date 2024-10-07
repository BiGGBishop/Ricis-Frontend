import { BounceLoader, ClipLoader, GridLoader, HashLoader, PacmanLoader } from "react-spinners";


const SaveDraftLoader = () => {

    return (
        <div className="flex justify-center items-center gap-28 fixed inset-0 bg-[rgb(0,0,0,0.8)] bg-opacity-50 z-[9999]">
            <PacmanLoader size={25} color="#fff" />
            {/* <BounceLoader size={40} color="#fff" /> */}
            <p className="text-white text-xl lg:text-3xl italic">Saving as Draft...</p>
        </div>
    )
}


export default SaveDraftLoader;