import vector from "@assets/image/not-found.svg"

const NotFound = ({ title }) => {
    return (
        <div className="p-4 text-center">
            <div className="d-flex justify-content-center mb-4">
                <img src={vector} width={200} height={200} alt="" />
            </div>
            <h4>{title}</h4>
        </div>
    )
}

export default NotFound;