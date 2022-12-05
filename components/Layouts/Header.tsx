import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

import { useUser } from '@auth0/nextjs-auth0/client'


const Header = () => {
    const user = useUser()
  return (
   <>
     <div className={styles.dFlex}>
     <Link href='/'>
        <div className={styles.logo}>IsIdOrE</div>
     </Link>
     {user && (
        <nav>
            <Link href='/admin'>+ Create</Link>
        </nav>
     )}
     <nav>
        {user ? (<div>
            <Link href='/api/auth/logout'>Logout</Link>
        </div> ): (<div>
            <Link href='/api/auth/login'>Login</Link>
        </div>)}
     </nav>

     </div>
   </>
  )
}

export default Header