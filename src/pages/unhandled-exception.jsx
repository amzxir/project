const UnhandledException = () => {
    return (
        <div className="main d-flex justify-content-center w-100">
            <main className="content d-flex p-0">
                <div className="container d-flex flex-column">
                    <div className="row h-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center">
                                    <h1 className="display-1 fw-bold text-info">500</h1>
                                    <p className="h2">حطای سرور</p>
                                    <p className="h4 fw-normal mt-3 mb-4">امکان پردارش درخواست شما وجود ندارد. </p>
                                    <NavLink className="btn btn-primary btn-lg" to="/">بازگشت به صفحه اصلی</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UnhandledException;