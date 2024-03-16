import { Await, defer, useLoaderData, useNavigate } from "react-router-dom"
import { HttpService } from "@core/http-service"
import { Suspense, useState } from "react"
import { toast } from "react-toastify"
import AdvLists from "../features/adv-manage/components/adv-lists"
import Modal from "../components/modal"
import AdvUpdate from "../features/adv-manage/components/adv-update"
import { useAdvContext } from "../features/adv-manage/components/adv-context"

const ManageAdv = () => {

    const { adv } = useAdvContext()

    const data = useLoaderData()

    const navigate = useNavigate()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedAdv, setSelectedAdv] = useState()
    const [showEditAdv , setShowEditAdv] = useState(false)


    const deleteAdv = (categoryId) => {
        setSelectedAdv(categoryId);
        setShowDeleteModal(true);
    }

    const handleDeleteAdv = async () => {
        setShowDeleteModal(false);
        const response = HttpService.delete(`/advertising/${selectedAdv}`);

        toast.promise(
            response, {
            pending: 'در حال دریافت اطلاعات ...',
            success: {
                render() {
                    const url = new URL(window.location.href);
                    navigate(url.pathname + url.search);
                    return 'عملیات با موفقیت انجام شد'
                }
            },
            error: {
                render({ data }) {
                    if (data.response.status === 400) {
                        return ('categoryList' + data.response.data.code)
                    } else {
                        return 'خطا در اجرای عملیات'
                    }
                }
            }

        }, {
            position: 'bottom-left'
        }
        )


    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    {
                        (showEditAdv || adv) && <AdvUpdate setShowEditAdv={setShowEditAdv} />
                    }
                    <Suspense fallback={<p>... درحال دریافت اطلاعات</p>}>
                        <Await resolve={data.adv}>
                            {
                                (loaderAdvs) => <AdvLists advertising={loaderAdvs} deleteAdv={deleteAdv} />
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <Modal isOpen={showDeleteModal} close={setShowDeleteModal} title="حذف" body="آیا از حذف این اگهی اطمینان دارید ؟">
                    <button type="button" className="btn btn-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>انصراف</button>
                    <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeleteAdv}>حذف</button>
            </Modal>
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