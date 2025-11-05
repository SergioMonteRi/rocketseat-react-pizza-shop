import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { cn } from '@/lib'

export const MonthCanceledOrdersAmountCard = () => {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-orders-amount'],
  })

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="2-4 text-muted-foreground h-4" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-muted-foreground text-xs">
              <span
                className={cn(
                  monthCanceledOrdersAmount.diffFromLastMonth <= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400',
                )}
              >
                {monthCanceledOrdersAmount.diffFromLastMonth === 0
                  ? ''
                  : monthCanceledOrdersAmount.diffFromLastMonth <= 0
                    ? '+'
                    : '-'}
                {monthCanceledOrdersAmount.diffFromLastMonth.toLocaleString(
                  'pt-BR',
                )}
                %
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
