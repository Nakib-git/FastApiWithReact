import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Employee from "./employee/EmployeeCmp";
import User from "./user/UserList";
import UserAdd from "./user/UserAdd";
import UserEdit from "./user/UserEdit";

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <div>CDAS V3 HOME</div>,
            errorElement: <div>404 not found</div>
        },
        {
            path: 'employee',
            element: <Employee />,
        },
        {
            path: 'user',
            element: <User />,
            children: [
                {
                    path:'add-user',
                    element:<UserAdd/>
                }
            ]

        }
    ]);
    return (
        // <RouterProvider router={router} />
        <BrowserRouter >
        <Routes>
            <Route path='/' element={<div>CDAS V3 HOME</div>} />
            <Route path='employee' element={<Employee />} />
            <Route path='user' element={<User />} />
            <Route path='user/add' element={<UserAdd/>} />
            <Route path='user/edit' element={<UserEdit/>} />
        </Routes>
    </BrowserRouter >
    );
}
export default Router;