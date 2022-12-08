import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

// import { useUser } from '@auth0/nextjs-auth0/client'
import Login from '../Login'

const Header = () => {
    // const {user} = useUser()
    // console.log(user, "user is not login")
  return (
   <>
     <div className={styles.dFlex}>
     <Link href='/'>
        <div className={styles.logo}>Isidore</div>
     </Link>
     <Login/>


     {/* {user && (
        <nav>
            <Link href='/admin'>+ Create</Link>
        </nav>
     )}
     <nav>
        {user ? (<div>
            <Link href='/api/auth/logout'>Logout</Link>
        </div> ): (<div>
            <a href='http://localhost:3000/api/auth/login'>Login</a>
        </div>)}
     </nav> */}

     </div>
   </>
  )
}

export default Header