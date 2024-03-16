import { Link } from "react-router-dom"
import vector from "@assets/image/img.webp"


const AdvItem = ({ name, mobile, address, description, lat, lng }) => {
    

    return (
        <div className="card">
            <img src={vector} className="card-img-top" alt="" />
            <div className="card-header px-4 pt-4 pb-4">
                <h4 className="mb-0">
                    <Link to={``}>{name}</Link>
                </h4>
            </div>
            <div className="card-body px-4 pt-2">
                <p className="text-truncate-3">{description}</p>
            </div>
        </div>
    )
}

export default AdvItem