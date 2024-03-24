import { useEffect, useState } from "react";
import { Tabs, Tab } from "../tab/Tabs";
import './User.css';
import { User, getAllUser,UserOrganization } from "../../Service/userService";
import { TableCellDateTime } from "../../Utility/common";
import UserForm from "./userForm/UserForm";
import UserOrganizationForm from "./userOrganization/UserOrganizationForm";

export const UserCmp = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({ userId: '', name: '', email: '', password: '', createDate: new Date(), organization: { orgId: '', orgName: '', createDate: new Date() } } as User);
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const getUsers = async () => {
    const users = await getAllUser();
    setUserList(users as User[]);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (id: string) => {
    setIsEdit(false);
    setFormData({ userId: '', name: '', email: '', password: '', createDate: new Date(), organization: { orgId: '', orgName: '', createDate: new Date() } } as User);
    const userToEdit = userList.find(user => user.userId === id);
    if (userToEdit) {
      if(!userToEdit.organization || userToEdit.organization==null){
         userToEdit.organization= { orgId: '', orgName: '', createDate: new Date() } as UserOrganization
      }
      setFormData(userToEdit);
      setIsEdit(true);
    }
  };

  const handleDelete = async (employeeId: string, createDate: Date) => {
    // await deleteEmployee(employeeId, createDate);
    // alert('Employee deleted successfully')
    // getEmployees();
  };
  const onUserSubmit = (user: User) => {
    if (user) {
      getUsers();
    }
  }
  const onAddUser = () => {
    setFormData({ userId: '', name: '', email: '', password: '', createDate: new Date(), organization: { orgId: '', orgName: '', createDate: new Date() } } as User);
    setIsEdit(false)
  }

  return (
    <div className="user-container">
      <div className="form-container">
        <h2>User</h2>
        {!isEdit && (
          <UserForm user={formData} onSubmit={onUserSubmit} />
        )}
        {isEdit && (
          <Tabs>
            <Tab title="User">
              <UserForm user={formData} onSubmit={onUserSubmit} />
            </Tab>
            <Tab title="Organization">
              <UserOrganizationForm user={formData} onSubmit={onUserSubmit} />
            </Tab>
          </Tabs>
        )}

      </div>
      <div className="list-container">
        <h2>User List</h2>
        <button className='add-button' onClick={onAddUser} type="button" disabled={!isEdit}>Add User</button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList?.map(user => (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <TableCellDateTime datetime={user.createDate} />
                <td>
                  <button className='edit-button' type='submit' onClick={() => handleEdit(user.userId)}>Edit</button>
                  <button className='delete-button' type='button' onClick={() => handleDelete(user.userId, user.createDate)}>Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UserCmp;