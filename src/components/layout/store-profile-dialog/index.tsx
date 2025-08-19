import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  getManagedRestaurantAPI,
  type GetManagedRestaurantResponse,
  updateProfileAPI,
} from '@/api'
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Textarea,
} from '@/components'

import { storeProfileDialogSchema } from './schema'
import type { StoreProfileDialogSchema } from './types'

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurantAPI,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileDialogSchema>({
    resolver: zodResolver(storeProfileDialogSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileDialogSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    console.log(cached)

    if (cached) {
      queryClient.setQueryData(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: updateProfileAPI,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  const handleUpdateProfile = async (data: StoreProfileDialogSchema) => {
    try {
      await updateProfile({
        name: data.name,
        description: data.description ?? '',
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar perfil, tente novamente.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize o perfil da sua loja para que os clientes possam conhecer
          melhor.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
