import { api } from "@/lib/api"

export const getProducts = async()=>{
    return api("/products")
}

export const createProduct = async (data : any) =>{
    return api("/products",{
        method:"POST",
        body:JSON.stringify(data),
    })
}

export const updateProduct = async (id:string, data:any)=>{
    return api(`/products/${id}`,{
        method:"PUT",
        body:JSON.stringify(data),
    })
}

export const deleteProduct = async (id:string)=>{
    return api(`/products/${id}`,{
        method:"DELETE",
    })
}