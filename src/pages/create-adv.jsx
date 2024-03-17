import { useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { HttpService } from "@core/http-service"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import LocationMarker from "@components/location-marker"

const CreateAdv = () => {

    const [position, setPosition] = useState(null)

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const onSubmit = async (data) => {
        if (position !== null) {
            const { lat, lng } = position
            const dataProvider = { ...data, lat, lng }
            try {
                const response = await HttpService.post('/advertising', dataProvider);
                if (response.status === 201) {
                    reset()
                    setPosition(null)
                    return toast.success("create adv")
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            toast.error("محل دقیق را روی نقشه پیدا کنید")
        }
    }


    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col-md-12 mb-2">
                            <small className="fw-bolder">برای ثبت محل دقیق ملک خود روی نقشه ضربه برنید.</small>
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
                        <div className="col-md-12 mb-1">
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
                        <div className="col-md-12 mb-1">
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
                        <div className="col-md-12 mb-1">
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
                        <div className="col-md-12 mb-1">
                            <label className="form-label">توضیحات</label>
                            <textarea
                                {...register("description", { required: true })}
                                type="text"
                                className={`form-control form-control-lg ${errors.description && 'is-invalid'}`}
                            />
                            {
                                errors.description && errors.description.type === 'required' && (
                                    <p className="text-danger small fw-bolder mt-1">فیلد توضیحات الزامی است.</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-lg btn-primary me-2">ثبت آگهی</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAdv;