import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Button, Input, Label } from '@/components'

import { signUpFormSchema } from './schema'
import type { SignUpFormData } from './types'

export const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      restaurantName: '',
      managerName: '',
      phone: '',
      email: '',
    },
  })

  const handleSignUp = async (data: SignUpFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)

    toast.success('Cadastro realizado com sucesso!', {
      action: {
        label: 'Fazer login',
        onClick: () => navigate('/sign-in'),
      },
    })
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="ghost" className="absolute top-8 right-8" asChild>
          <Link to="/sign-in">Já tenho uma conta</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta gratuita
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e impulsione o seu negócio
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
              {errors.restaurantName && (
                <p className="text-destructive text-xs">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
              {errors.managerName && (
                <p className="text-destructive text-xs">
                  {errors.managerName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
              {errors.phone && (
                <p className="text-destructive text-xs">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <Button
              className="mt-8 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Finalizar cadastro
            </Button>

            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao continuar, você concorda com nosso{' '}
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{' '}
              e {''}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
