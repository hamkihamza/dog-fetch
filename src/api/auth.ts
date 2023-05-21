import React from 'react';
import { Dog, Location } from './models';


const BASE_URL = 'https://frontend-take-home-service.fetch.com' 

export async function login(name: string, email: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
      credentials: 'include',  // Include credentials in the request
    });
  
    return response;
  }
  

  export async function logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',  // Include credentials in the request
    });
  
    return response;
  }


  
export const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuth: (auth: boolean) => {}
  });
  

  interface SearchDogsParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: string;
    sort?: string;
  }
  
  export async function searchDogs(searchParams: SearchDogsParams):  Promise<{ok: boolean, data?: Dog[], error?: string}> {
    const queryParams = new URLSearchParams();
  
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(val => queryParams.append(`${key}[]`, val));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
  
    const response = await fetch(`${BASE_URL}/dogs?${queryParams.toString()}`);
    
    if (!response.ok) {
      return { ok: false };
    }
  
    const data = await response.json();
    
    return { ok: true, data };
  }
  