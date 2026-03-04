import { redirect } from 'next/dist/server/api-utils';
import React from 'react'

const layout = async  ({children}: { children: React.ReactNode }) => {

    const isUserAuthenticated = false; // remove later

    
    // const isUserAuthenticated = await isAuthenticated(); 
    // if (!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default layout
