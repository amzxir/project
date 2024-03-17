import { Suspense } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Await, defer, useLoaderData } from "react-router-dom";
import { HttpService } from "@core/http-service";



const AdvDetails = () => {

    const data = useLoaderData();


    return (
        <Suspense fallback={<p>درحال دریافت اطلاعات ...</p>}>
            <Await resolve={data.details}>
                {
                    (details) => (
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body pt-0">
                                            <MapContainer
                                            className="mx-auto my-4 d-block rounded"
                                                center={{ lat: details.lat, lng: details.lng }}
                                                zoom={16}
                                                style={{ height: '300px' }}
                                                scrollWheelZoom={false}>
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={{ lat: details.lat, lng: details.lng }}>
                                                    <Popup>
                                                        اینجا خونه ماس بیا تو
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                            <div className="d-flex flex-column justify-content-center pe-4 text-center">
                                                {/* <div className="badge bg-info my-2 align-self-center">{"details.courseCategory"}</div> */}
                                                <h4>{details.name}</h4>
                                                <h4>{details.mobile}</h4>
                                                <h4>{details.address}</h4>
                                                <p>{details.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">زمان آموزش</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.duration} ساعت</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">سطح دوره</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.courseLevel}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">تعداد فصل ها</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.numOfChapters} فصل</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">تعداد مباحث</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.numOfLectures} مبحث</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">تعداد نظرات </h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.numOfReviews} نظر</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">میانگین نظرات</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.averageReviewRating + "از 5"}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    )
                }

            </Await>
        </Suspense>
    )
}

export default AdvDetails

export async function detailsAdvLoader({ params }) {
    return defer({
        details: loaderDetails(params.id)
    })
}

const loaderDetails = async (id) => {
    const response = await HttpService.get(`/advertising/${id}`);
    return response.data;
}