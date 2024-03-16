import { Suspense, useState } from "react";
import { Link, Await, defer, useLoaderData } from "react-router-dom";
import { HttpService } from "@core/http-service";
import AdvList from "../features/adv/components/adv-list";


const Adv = () => {

    const data = useLoaderData()

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <Link to="create-adv" className="btn btn-primary fw-bolder mt-n1">افزودن آگهی جدید</Link>
                </div>
                <Suspense fallback={<p className="text-info">... درحال دریافت اطلاعات</p>}>
                    <Await resolve={data.adv}>
                        {
                            (loaderAdvs) => <AdvList advertising={loaderAdvs} />
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default Adv;

export async function advLodear({ request }) {
    return defer({
        adv: loadAdv(request)
    })
}

const loadAdv = async (request) => {
    const page = new URL(request.url).searchParams.get('page') || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = '/advertising';
    url += `?_page=${page}&_per_page=${pageSize}`
    const response = await HttpService.get(url);
    console.log(response.data)
    return response.data;
}