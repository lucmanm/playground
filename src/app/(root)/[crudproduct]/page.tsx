import React from 'react'
import AddEditProjectForm from './add-edit-project-form'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
type TProductProps ={
  params: {
    crudproduct: string
  }
}

const AddEditProduct = async ({ params }:TProductProps) => {

  const session = await auth()

  if(!session){
    redirect("/login?callbackUrl=/create-product")
  }
  const project = await prisma.project.findFirst({
    where: {
      id: params.crudproduct
    },
    include:{
      technology: true
    }
  })
  

  const technologyData = await prisma.technology.findMany()
  return <AddEditProjectForm data={project} technology={technologyData}/>

}

export default AddEditProduct
