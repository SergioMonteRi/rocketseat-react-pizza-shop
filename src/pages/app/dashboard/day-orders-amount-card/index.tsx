import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDayOrdersAmount } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { cn } from '@/lib'

export const DayOrdersAmountCard = () => {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ['metrics', 'day-orders-amount'],
  })

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="2-4 text-muted-foreground h-4" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-muted-foreground text-xs">
              <span
                className={cn(
                  dayOrdersAmount.diffFromYesterday >= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400',
                )}
              >
                {dayOrdersAmount.diffFromYesterday === 0
                  ? ''
                  : dayOrdersAmount.diffFromYesterday > 0
                    ? '+'
                    : '-'}
                {dayOrdersAmount.diffFromYesterday.toLocaleString('pt-BR')}%
              </span>{' '}
              em relação ao dia passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
