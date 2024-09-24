import axios from "@/services/axios";

const Apis = {
    Login: "admin/login",
    List: "/admin/device-config/list",
    Add: "/admin/device-config/add",
    Edit: "/admin/device-config/edit",
    Del: "/admin/device-config/del",
    Info: "/admin/device-config/info",
}

export const Login = (params) => axios.post(Apis.Login, params)
export const List = (params) => axios.post(Apis.List, params)
export const Add = (params) => axios.post(Apis.Add, params)
export const Edit = (params) => axios.post(Apis.Edit, params)
export const Del = (params) => axios.post(Apis.Del, params)
export const Info = (params) => axios.post(Apis.Info, params)
