import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import { Activity, CreditCard, ShoppingCart, Users } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDate, formatNumber } from "@/lib/format"

export const metadata: Metadata = {
  title: "대시보드",
}

type StatCard = {
  title: string
  value: string
  change: string
  icon: LucideIcon
}

type OrderStatus = "완료" | "처리 중" | "취소"

type Order = {
  id: string
  customer: string
  amount: number
  status: OrderStatus
  date: string
}

// 샘플 통계 데이터
const statCards: StatCard[] = [
  { title: "총 매출", value: formatCurrency(45231000), change: "+20.1%", icon: CreditCard },
  { title: "신규 가입자", value: formatNumber(2350), change: "+18.3%", icon: Users },
  { title: "주문 수", value: formatNumber(12234), change: "+4.5%", icon: ShoppingCart },
  { title: "활성 사용자", value: formatNumber(573), change: "+2.1%", icon: Activity },
]

// 샘플 최근 주문 데이터
const recentOrders: Order[] = [
  { id: "ORD-1024", customer: "김민준", amount: 128000, status: "완료", date: "2026-10-03" },
  { id: "ORD-1023", customer: "이서연", amount: 54000, status: "처리 중", date: "2026-10-03" },
  { id: "ORD-1022", customer: "박지호", amount: 312000, status: "완료", date: "2026-10-02" },
  { id: "ORD-1021", customer: "최수아", amount: 23000, status: "취소", date: "2026-10-01" },
  { id: "ORD-1020", customer: "정도윤", amount: 89000, status: "완료", date: "2026-09-30" },
]

// 주문 상태별 배지 스타일
const statusVariant: Record<OrderStatus, "default" | "secondary" | "destructive"> = {
  완료: "default",
  "처리 중": "secondary",
  취소: "destructive",
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="대시보드" description="서비스 현황을 한눈에 확인하세요." />

      {/* 통계 카드: 모바일 1열 → 태블릿 2열 → 데스크톱 4열 */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardDescription>{stat.title}</CardDescription>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">지난달 대비 {stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 주문</CardTitle>
          <CardDescription>최근 5건의 주문 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문 번호</TableHead>
                <TableHead>고객</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>주문일</TableHead>
                <TableHead className="text-right">금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
