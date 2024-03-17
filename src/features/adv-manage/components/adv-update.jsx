import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { HttpService } from "@core/http-service"
import { toast } from "react-toastify"
import { MapContainer, TileLayer } from "react-leaflet"
import { useNavigate } from "react-router-dom"
import { useAdvContext } from "./adv-context"
import LocationMarker from "@components/location-marker";

const AdvUpdate = ({ setShowEditAdv }) => {

    const [position, setPosition] = useState(null)

    const { adv, setAdv } = useAdvContext()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const navigate = useNavigate()

    useEffect(() => {
        if (adv) {
            setValue('name', adv.name)
            setValue('mobile', adv.mobile)
            setValue('address', adv.address)
            setValue('description', adv.description)
            setValue('id', adv.id)
        }
    }, [adv])


    const onSubmit = async (data) => {
        if (position !== null) {
            setShowEditAdv(false);
            const { lat, lng } = position
            const dataProvider = { ...data, lat, lng }
            const response = HttpService.put(`/advertising/${data.id}`, dataProvider);

            toast.promise(
                response, {
                pending: 'در حال انجام عملیات ...',
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        if (adv) {
                            setAdv(null)
                        }
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
        } else {
            toast.error("محل دقیق را روی نقشه پیدا کنید")
        }
    }

    const onClose = () => {
        setShowEditAdv(false);
        setAdv(null)
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <small className="fw-bolder">برای ویرایش محل دقیق ملک خود روی نقشه ضربه برنید.</small>
                            <MapContainer
                                center={{ lat: 35.715298, lng: 51.404343 }}
                                zoom={16}
                                style={{ height: '300px' }}
                                scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker
                                    position={position}
                                    setPosition={setPosition}
                                />
                            </MapContainer>
                        </div>
                        <div className="col-md-6 mb-1">
                            <label className="form-label">نام فروشنده</label>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                className={`form-control form-control-lg ${errors.name && 'is-invalid'}`}
                            />
                            {
                                errors.name && errors.name.type === 'required' && (
                                    <p className="text-danger small fw-bolder mt-1">فیلد نام فروشنده الزامی است.</p>
                                )
                            }
                        </div>
                        <div className="col-md-6 mb-1">
                            <label className="form-label">شماره موبایل</label>
                            <input
                                {...register("mobile", { required: true, minLength: 11, maxLength: 11 })}
                                type="number"
                                style={{ direction: 'ltr' }}
                                className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`}
                            />
                            {
                                errors.mobile && errors.mobile.type === 'required' && (
                                    <p className="text-danger small fw-bolder mt-1">فیلد شماره موبایل الزامی است.</p>
                                )
                            }
                            {
                                errors.mobile && (errors.mobile.type === 'minLength' || errors.mobile.type === 'maxLength') && (
                                    <p className="text-danger small fw-bolder mt-1">موبایل باید 11 رقم باشد</p>
                                )
                            }
                        </div>
                        <div className="col-md-6 mb-1">
                            <label className="form-label">ادرس</label>
                            <input
                                {...register("address", { required: true })}
                                type="text"
                                className={`form-control form-control-lg ${errors.address && 'is-invalid'}`}
                            />
                            {
                                errors.address && errors.address.type === 'required' && (
                                    <p className="text-danger small fw-bolder mt-1">فیلد ادرس الزامی است.</p>
                                )
                            }
                        </div>
                        <div className="col-md-6 mb-1">
                            <label className="form-label">توضیحات</label>
                            <textarea
                                {...register("description", { required: true })}
                                type="text"
                                rows="1"
                                className={`form-control form-control-lg ${errors.description && 'is-invalid'}`}
                            />
                            {
                                errors.description && errors.description.type === 'required' && (
                                    <p className="text-danger small fw-bolder mt-1">فیلد توضیحات الزامی است.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="text-start mt-3">
                        <button type="button" className="btn btn-lg btn-secondary ms-2" onClick={onClose}>بستن</button>
                        <button type="submit" className="btn btn-lg btn-primary me-2">ثبت تغییرات</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdvUpdate;