import React from 'react'
import AddEditProjectForm from './add-edit-project-form'
import { prisma } from '@/lib/prisma'
type TProductProps ={
  params: {
    crudproduct: string
  }
}
const AddEditProduct = async ({ params }:TProductProps) => {
  const project = await prisma.project.findFirst({
    where: {
      id: params.crudproduct
    }
  })
  return (
    <div>
      <AddEditProjectForm data={project}/>
    </div>
  )
}

export default AddEditProduct
