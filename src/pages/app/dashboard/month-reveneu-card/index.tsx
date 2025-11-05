import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { cn } from '@/lib'

export const MonthRevenueCard = () => {
  const { data: monthRevenue } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ['metrics', 'month-revenue'],
  })

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total do mês
        </CardTitle>
        <DollarSign className="2-4 text-muted-foreground h-4" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-muted-foreground text-xs">
              <span
                className={cn(
                  monthRevenue.diffFromLastMonth >= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400',
                )}
              >
                {monthRevenue.diffFromLastMonth === 0
                  ? ''
                  : monthRevenue.diffFromLastMonth >= 0
                    ? '+'
                    : '-'}
                {monthRevenue.diffFromLastMonth.toLocaleString('pt-BR')}%
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
