import Pagination from "@components/pagination"
import AdvItem from "./adv-item"

const AdvList = ({ advertising: { data, items } }) => {
    return (
        <div className="row">
            {
                data.map((i) => (
                    <div className="col-lg-4 col-sm-6 col-md-6 col-12" key={i.id}>
                        <AdvItem {...i} />
                    </div>
                ))
            }
            <Pagination totalRecords={items} />
        </div>
    )
}

export default AdvList