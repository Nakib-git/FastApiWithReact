import { useState } from "react";
import { User, addUser } from "../../../Service/userService";
import './UserForm.css';

interface UserFormProps {
    user: User
    onSubmit: (user: User) => void
}
export const UserForm = ({ user, onSubmit }: UserFormProps) => {
    const [formData, setFormData] = useState<User>(user);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (user.employeeId || user.employeeId !== '') {
        //   await updateEmployee(user.employeeId, user.createDate, user as Employee);
        //   alert('Employee updated successfully')
        // } else {
        formData.contactList = [];
        await addUser(formData);
        alert('Employee added  successfully')
        // }
        setFormData({ userId: '', name: '', email: '', password: '', createDate: new Date(), organization: null } as User);
        onSubmit(formData);
    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h2>{formData.userId === '' ? 'Add' : 'Update'} User</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={formData.userId} />
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleFormChange} />
                </div>
                <button type="submit">{formData.userId === '' ? 'Add' : 'Update'}</button>
            </form>
        </>
    );
}
export default UserForm;