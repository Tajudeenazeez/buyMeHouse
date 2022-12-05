// pages/admin.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import toast, { Toaster } from 'react-hot-toast'
import { getSession } from '@auth0/nextjs-auth0'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma'
import next from 'next'



const CreateInvestmentMutation = gql`
  mutation($title: String!, $imageUrl: String!, $category: String!, $description: String!, $amount: Int!) {
    createLink(title: $title, imageUrl: $imageUrl, category: $category, description: $description, amount:$amount) {
      title
      imageUrl
      category
      description
      amount
    }
  }
`

const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [createInvestment, { loading, error }] = useMutation(CreateInvestmentMutation, {
    onCompleted: () => reset()
  })

    const submitHandler = async (data: any) => {
        const { title, category, description, amount } =  data
        const imageUrl = `https://via.placeholder.com/300`
        const variables = { title, category, description, imageUrl, amount }
        try {
            toast.promise(createInvestment({ variables }), {
                loading: 'Creating new investment...',
                success: 'investment successfully created!🎉',
                error: `Something went wrong 😥 Please try again -  ${error}`,
            }
        )

        } catch (error) {
        console.error(error)
        }
  }

  return (
    <div className={styles.special}>
      <Toaster />
      <h1 >Create a new investment</h1>
      <form  onSubmit={handleSubmit(submitHandler)}>
        <label>
          <span >Title</span>
          <input
            // name='title'
            placeholder="Title"
            type="text"
            {...register('title', { required: true })}
          />
        </label>
        <label className={styles.block}>
          <span >Description</span>
          <input
            placeholder="Description"
            {...register('description', { required: true })}
            name="description"
            type="text"
          />
        </label>
       
        <label className={styles.block}>
          <span>Category</span>
          <input
            placeholder="category"
            {...register('category', { required: true })}
            name="category"
            type="text"
          />
        </label>
        <label className={styles.block}>
          <span>Amount</span>
          <input
            placeholder="Amount"
            {...register('amount', { required: true })}
            name="amount"
            type="text"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <span>
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Creating...
            </span>
          ) : (
            <span>Create Investment</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default Admin

export const getServerSideProps = async ({ req, res }:any) => {
  const session = await getSession(req, res)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    }
  }
  const user = await prisma.user.findUnique({
    select: {
      email: true,
      role: true,
    },
    where: {
      email: session.user.email,
    },
  });

  if (session.user.role !== 'ADMIN') {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: {},
  }
}