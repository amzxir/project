import { useForm } from "react-hook-form";
import { Link, redirect, useActionData, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import { HttpService } from "@core/http-service";
import { toast } from "react-toastify";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = useSubmit();

    const onSubmit = (data) => {
        submitForm(data, { method: 'post' })
    }

    const navigation = useNavigation();
    const isSubmiting = navigation.state !== 'idle';

    const isSuccessForm = useActionData();


    const routeError = useRouteError();

    return (
        <>
            <div className="text-center mt-4">
                <h1 className="h2">پلتفرم فروش مسکن</h1>
                <p className="lead">
                    جهت ورود لازم است از طریق ایمیل و رمز عبور خود اقدام کنید
                </p>
                <p className="lead">
                    قبلا ثبت نام نکرده اید؟
                    <Link to="/register" className="me-2">ثبت نام کنید </Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">ایمیل</label>
                                <input
                                    {...register("email", { required: 'فیلد ایمیل الزامی است' })}
                                    className={`form-control form-control-lg ${errors.email && 'is-invalid'}`}
                                />
                                {
                                    errors.email && errors.email.type === 'required' && (
                                        <p className="text-danger small fw-bolder mt-1">{errors.email?.message}</p>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">رمز عبور</label>
                                <input
                                    {...register("password", { required: 'فیلد رمز عبور الزامی است' })}
                                    className={`form-control form-control-lg mb-2 ${errors.password && 'is-invalid'}`}
                                    type="password"
                                />
                                {
                                    errors.password && errors.password.type === 'required' && (
                                        <p className="text-danger small fw-bolder mt-1">{errors.password?.message}</p>
                                    )
                                }
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" disabled={isSubmiting} className="btn btn-lg btn-primary">
                                    {isSubmiting ? 'درحال انجام عملیات' : 'وارد شوید'}
                                </button>
                            </div>
                            {
                                isSuccessForm && (
                                    <div className="alert alert-success text-success p-2 mt-3">
                                        عملیات با موفقیت انجام شد
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;

export async function loginAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    const { email, password } = data
    const response = await HttpService.get(`/user`)
    const findUser = response.data.filter(i => i.email === email)
    const findPassword = response.data.filter(i => i.password === password)
    if (findUser.length === 0) {
        toast.error('ایمیل اشتباه است مجدد تلاش کنید', {
            position: 'bottom-left'
        });
    } else {
        if (findPassword.length !== 0) {
            toast.success('با موفقیت وارد شدید', {
                position: 'bottom-left'
            });
            localStorage.setItem('token', 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4');
            return redirect('/')
        } else {
            toast.error('رمز اشتباه است مجدد تلاش کنید', {
                position: 'bottom-left'
            });
        }
    }
}