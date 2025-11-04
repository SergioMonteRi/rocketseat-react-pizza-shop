import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder, type GetOrdersResponse } from '@/api'
import {
  Button,
  Dialog,
  DialogTrigger,
  TableCell,
  TableRow,
} from '@/components'
import { queryClient } from '@/lib'

import { OrderDetails } from '../order-details'
import { OrderStatus } from '../order-status'
import type { OrderTableRowProps } from '../orders'

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const { orderId, createdAt, status, customerName, total } = order

  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) return

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) =>
            order.orderId === orderId
              ? { ...order, status: 'canceled' }
              : order,
          ),
        })
      })
    },
  })

  const formattedTotal = (total / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const distanceToNow = formatDistanceToNow(createdAt, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          {isDetailsDialogOpen && (
            <OrderDetails orderId={orderId} isOpen={isDetailsDialogOpen} />
          )}
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{orderId}</TableCell>
      <TableCell className="text-muted-foreground">{distanceToNow}</TableCell>
      <TableCell>
        <OrderStatus status={status} />
      </TableCell>
      <TableCell className="font-medium">{customerName}</TableCell>
      <TableCell className="font-medium">R$ {formattedTotal}</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          size="xs"
          variant="ghost"
          disabled={!['pending', 'processing'].includes(status)}
          onClick={() => cancelOrderFn({ orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
