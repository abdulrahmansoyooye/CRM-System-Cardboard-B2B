import { Key } from 'lucide-react';
import NodeCache from "node-cache";
const cache = new NodeCache(
    {
        stdTTL: 60,
        checkperiod: 120,
        useClones: false,
    }
)

export function get<T>(key:string) : T | undefined {
   return cache.get<T>(key)
}


export function set<T>(key:string, value:T, ttl?:number): boolean {

    if(ttl){
       return cache.set(key,value,ttl)
    }
       return cache.set(key,value)
}


export function createCache<T>(key:string) : T | undefined {
   return cache.get<T>(key)
}

export function purgeCachePrefix<T>(method:string,path:string,query:string) : T | undefined {
   
}