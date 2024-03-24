import axios from "axios"
import { API_URL } from "../Utility/common"

export type User = {
  userId: string
  name: string,
  email: string,
  password: string,
  createDate: Date
  organization: UserOrganization | null
  contactList: UserContact[]
}
export type UserContact = {
  userId: string
  contactId: string,
  relation: string,
  name: string,
  createDate: Date
}
export type UserOrganization = {
  orgId: string
  orgName: string,
  createDate: Date
}

export const getAllUser = async () => {
  const response = await axios.get(`${API_URL}/getAllUser`);
  return response.data;
};

export const addUser = async (user: User) => {
  const response = await axios.post(`${API_URL}/addUser/`, user);
  return response.data;
};

export const updateUser = async (userId: string, createDate: Date, user: User) => {
  const response = await axios.put(`${API_URL}/updateUser/${userId}/${createDate}`, user);
  return response.data;
};