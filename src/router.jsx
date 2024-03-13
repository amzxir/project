import { createBrowserRouter } from "react-router-dom";
import IdentityLayouts from "./layouts/identity-layouts";
import Login , { loginAction } from "./features/identity/components/login/login";
import Register, { submitAction } from "./features/identity/components/register/register";

const router = createBrowserRouter([
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