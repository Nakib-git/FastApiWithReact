import { useState } from "react";
import { User, addUser, updateUser } from "../../../Service/userService";
import './UserForm.css';
import { NotificationProps, notification } from "../../notify/Notification";

interface UserFormProps {
    user: User,
}
export const UserForm = ({ user }: UserFormProps) => {
    const [formData, setFormData] = useState<User>(user);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.userId === '') {
            formData.contactList = [];
            await addUser(formData);
            notification({ message: 'Employee added  successfully', type: 'success' } as NotificationProps)
        } else {
            await updateUser(formData.userId, formData.createDate, formData);
            notification({ message: 'Employee update  successfully', type: 'success' } as NotificationProps)
        }
        
    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="user">
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
        </div>
    );
}
export default UserForm;