import { createBrowserRouter } from "react-router-dom";
import IdentityLayouts from "./layouts/identity-layouts";
import Login, { loginAction } from "./features/identity/components/login/login";
import Register, { submitAction } from "./features/identity/components/register/register";
import MainLayouts from "./layouts/MianLayouts/main-layouts";
import Adv, { advLodear } from "./pages/adv";
import CreateAdv from "./pages/create-adv";
import AdvDetails, { detailsAdvLoader } from "./features/adv/components/adv-details";
import { AdvProvider } from "./features/adv-manage/components/adv-context";
import ManageAdv, { advManageLoader } from "./pages/manage-adv";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts />,
        children: [
            {
                index: true,
                element: <Adv />,
                loader: advLodear
            },
            {
                path: 'create-adv',
                element: <CreateAdv />
            },
            {
                path: 'adv-details/:id',
                element: <AdvDetails />,
                loader: detailsAdvLoader
            },
            {
                path: 'manage-adv',
                element: <AdvProvider>
                    <ManageAdv />
                </AdvProvider>,
                loader:advManageLoader
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