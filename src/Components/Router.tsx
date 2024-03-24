import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employee from "./employee/EmployeeCmp";
import User from "./user/UserCmp";

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <div>CDAS V3 HOME</div>,
            errorElement: <div>404 not found</div>
        },
        {
            path: '/employee',
            element: <Employee />,
        },
        {
            path: '/user',
            element: <User />
        }
    ]);
    return (
        <RouterProvider router={router} />
    );
}
export default Router;