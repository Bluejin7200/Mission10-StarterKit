"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

import { Logo } from "@/components/common/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { siteConfig } from "@/config/site"
import { logout } from "@/lib/api/auth"
import type { Session } from "@/lib/auth/session"

type AppSidebarProps = {
  user: Session
}

// 대시보드 좌측 사이드바 (모바일에서는 자동으로 Sheet로 전환)
export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("로그아웃했습니다.")
      router.replace("/")
      router.refresh()
    },
    onError: (error) => toast.error(error.message),
  })

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo
          href="/dashboard"
          className="h-8 px-2 group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:[&>span]:hidden"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {siteConfig.dashboardNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="사용자">
              <Avatar className="size-8">
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="로그아웃"
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut />
              <span>로그아웃</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
