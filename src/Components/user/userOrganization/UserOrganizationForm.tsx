import { useState } from "react";
import { User, UserOrganization, addUser, updateUser } from "../../../Service/userService";
import './UserOrganizationForm.css';

interface UserOrganizationFormProps {
    user: User
    onSubmit: (user: User) => void
}
export const UserOrganizationForm = ({ user, onSubmit }: UserOrganizationFormProps) => {
    const [formData, setFormData] = useState<UserOrganization>(user.organization ? user.organization : { orgId: '', orgName: '', createDate: new Date() } as UserOrganization);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData) {
            user.organization = formData
            await updateUser(user.userId, user.createDate, user);
            alert('Organization added  successfully')
            setFormData(user.organization as UserOrganization);
        }
        
        onSubmit(user);
    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h2>{formData.orgId === '' ? 'Add' : 'Update'} User Organization</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={formData.orgId} />
                <div>
                    <label>Name:</label>
                    <input type="text" name="orgName" value={formData.orgName} onChange={handleFormChange} />
                </div>
                <button type="submit">{formData.orgId === '' ? 'Add' : 'Update'}</button>
            </form>
        </>
    );
}
export default UserOrganizationForm;