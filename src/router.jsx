import { createBrowserRouter } from "react-router-dom";
import IdentityLayouts from "./layouts/identity-layouts";
import Login , { loginAction } from "./features/identity/components/login/login";
import Register, { submitAction } from "./features/identity/components/register/register";
import MainLayouts from "./layouts/MianLayouts/main-layouts";
import Adv from "./pages/adv";
import CreateAdv from "./pages/create-adv";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayouts/>,
        children:[
            {
                index:true,
                element:<Adv/>
            },
            {
                path:'create-adv',
                element:<CreateAdv/>
            }
        ]
    },
    {
        element: <IdentityLayouts />,
        children: [
            {
                path: 'login',
                element: <Login />,
                errorElement: <Login />,
                action: loginAction
            },
            {
                path: 'register',
                element: <Register />,
                errorElement: <Register />,
                action: submitAction
            }
        ]
    }
])

export default router;