import { Suspense } from "react";
import { Link, Await, defer, useLoaderData } from "react-router-dom";
import { HttpService } from "@core/http-service";
import AdvList from "../features/adv/components/adv-list";


const Adv = () => {

    const data = useLoaderData();

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <Link to="create-adv" className="btn btn-primary fw-bolder mt-n1">افزودن آگهی جدید</Link>
                </div>
                <Suspense fallback={<p className="text-info">... درحال دریافت اطلاعات</p>}>
                    <Await resolve={data.adv}>
                        {
                            (loaderCourses) => <AdvList advertising={loaderCourses} />
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default Adv;

export async function advLodear() {
    return defer({
        adv: loadAdv()
    })
}

const loadAdv = async () => {
    const response = await HttpService.get('/advertising')
    return response.data
}