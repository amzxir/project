import { Await, defer, useLoaderData, useNavigate } from "react-router-dom"
import { HttpService } from "@core/http-service"
import { Suspense, useState } from "react"
import { toast } from "react-toastify"
import AdvLists from "../features/adv-manage/components/adv-lists"

const ManageAdv = () => {

    const data = useLoaderData();


    return (
        <>
            <div className="row">
                <div className="col-12">
                    {/* {
                        (showAddcategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
                    } */}
                    <Suspense fallback={<p>... درحال دریافت اطلاعات</p>}>
                        <Await resolve={data.adv}>
                            {
                                (loaderAdvs) => <AdvLists advertising={loaderAdvs} />
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            {/* <Modal isOpen={showDeleteModal} close={setShowDeleteModal} title="حذف" body="آیا از حذف این دسته اطمینان دارید ؟" >
                <button type="button" className="btn btn-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>انصراف</button>
                <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeleteCategory}>حذف</button>
            </Modal> */}
        </>
    )
}

export default ManageAdv;

export async function advManageLoader({ request }) {
    return defer({
        adv: loaderAdv(request)
    })
}

const loaderAdv = async (request) => {
    const page = new URL(request.url).searchParams.get('page') || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = '/advertising';
    url += `?_page=${page}&_per_page=${pageSize}`
    const response = await HttpService.get(url);
    console.log(response.data)
    return response.data;
}