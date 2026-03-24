export const API_BASE_URL = "http://localhost:4000/api/v1";

export const api = async (url:string, options?:RequestInit)=>{
   const res = await fetch(`${API_BASE_URL}${url}`,{...options,headers:{
    "Content-Type":"application/json",
    ...(options?.headers || {}),
   }})

   const data = await res.json()
   if(!res.ok){
    throw new Error(data.message || "Failed to fetch data")
   }
   return data
}