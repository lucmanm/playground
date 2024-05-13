"use client"
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/button'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>


function CustomButton(props: ButtonProps) {
  const router = useRouter()
  return (
    <Button {...props} onClick={() => router.push("/create-product")}/>
  )
}

export default CustomButton
