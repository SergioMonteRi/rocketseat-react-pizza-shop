import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { cn } from '@/lib'

export const MonthOrdersAmountCard = () => {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount'],
  })

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="2-4 text-muted-foreground h-4" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-muted-foreground text-xs">
              <span
                className={cn(
                  monthOrdersAmount.diffFromLastMonth >= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400',
                )}
              >
                {monthOrdersAmount.diffFromLastMonth === 0
                  ? ''
                  : monthOrdersAmount.diffFromLastMonth > 0
                    ? '+'
                    : '-'}
                {monthOrdersAmount.diffFromLastMonth.toLocaleString('pt-BR')}%
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
