import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'

import { signInAPI } from '@/api'
import { Button, Input, Label } from '@/components'

import { signInFormSchema } from './schema'
import type { SignInFormData } from './types'

export const SignIn = () => {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signInAPI })

  const handleSignIn = async (data: SignInFormData) => {
    await authenticate(data)

    toast.success('Enviamos um link de atualização para seu e-mail', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSignIn(data),
      },
    })
  }

  return (
    <>
      <Helmet title="Login" />
x
      <div className="p-8">
        <Button variant="ghost" className="absolute top-8 right-8" asChild>
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Insira suas credenciais para acessar o painel
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
