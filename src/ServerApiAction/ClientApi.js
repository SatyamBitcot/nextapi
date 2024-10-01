"use client";

import * as API from "./ServerApi";

export const post = async (url, body) => {
    const res  = await new Promise(async (resolve, reject) => {
        const res = await API.post(url, body);
        if(res.status==='OK') {
         resolve(res);
        } 
        else {
            reject(new Error(res.message));
        }
        
     });
     return res
};

export const get = async (url, params) => {
    const res  = await new Promise(async (resolve, reject) => {
        const res = await API.get(url, params ?? {});

        if(res.status===200) {
         resolve(res);
        } else {
         reject(new Error(res));
        }
    })
    return res
}


export const del = async (url, params) => {
    const res = await new Promise(async (resolve, reject) => {
      const res = await API.del(url, params ?? {});
      if (res.status===200) {
        resolve(res);
      } else {
        reject(new Error(res));
      }
    });
    return res;
  };

export const put = async (url, body, params) => {
    const res = await new Promise(async (resolve, reject) => {
        const res = await API.put(url, body ?? {}, params ?? {});
        if (res.status==='OK') {
            resolve(res);
        }  else {
            reject(new Error(res.message));
        }
    });
    return res;
};