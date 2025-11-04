import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import {
  approveOrder,
  cancelOrder,
  deliverOrder,
  dispatchOrder,
  type GetOrdersResponse,
} from '@/api'
import {
  Button,
  Dialog,
  DialogTrigger,
  TableCell,
  TableRow,
} from '@/components'
import { queryClient } from '@/lib'

import { OrderDetails } from '../order-details'
import { OrderStatus, type OrderStatusType } from '../order-status'
import type { OrderTableRowProps } from '../orders'

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const { orderId, createdAt, status, customerName, total } = order

  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order,
        ),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
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
        {status === 'pending' && (
          <Button
            size="xs"
            variant="outline"
            onClick={() => approveOrderFn({ orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isApprovingOrder ? 'Aprovar...' : 'Aprovar'}
          </Button>
        )}

        {status === 'processing' && (
          <Button
            size="xs"
            variant="outline"
            onClick={() => dispatchOrderFn({ orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isDispatchingOrder ? 'Despachar...' : 'Despachar'}
          </Button>
        )}

        {status === 'delivering' && (
          <Button
            size="xs"
            variant="outline"
            onClick={() => deliverOrderFn({ orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {isDeliveringOrder ? 'Entregar...' : 'Entregar'}
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          size="xs"
          variant="ghost"
          disabled={
            !['pending', 'processing'].includes(status) || isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
