import AdvItem from "./adv-item"

const AdvList = ({ advertising }) => {
    return (
        <div className="row">
            {
                advertising.map((i) => (
                    <div className="col-lg-4 col-sm-6 col-md-6 col-12" key={i.id}>
                        <AdvItem {...i} />
                    </div>
                ))
            }
        </div>
    )
}

export default AdvList