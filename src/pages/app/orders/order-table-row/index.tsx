import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogTrigger,
  TableCell,
  TableRow,
} from '@/components'

import { OrderDetails } from '../order-details'
import { OrderStatus } from '../order-status'
import type { OrderTableRowProps } from '../orders'

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const { orderId, createdAt, status, customerName, total } = order

  const formattedTotal = total.toLocaleString('pt-BR', {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
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
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
