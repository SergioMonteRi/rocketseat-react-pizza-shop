import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { getManagedRestaurantAPI } from '@/api'
import {
  Button,
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
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurantAPI,
  })

  const { register, handleSubmit } = useForm<StoreProfileDialogSchema>({
    resolver: zodResolver(storeProfileDialogSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize o perfil da sua loja para que os clientes possam conhecer
          melhor.
        </DialogDescription>
      </DialogHeader>

      <form>
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
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
