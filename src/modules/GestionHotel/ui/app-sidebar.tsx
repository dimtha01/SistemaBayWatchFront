import * as React from "react"
import {
  IconDashboard,
  IconBed,
  IconCalendarEvent,
  IconClipboardList,
  IconSettings,
  IconTool,
  IconPlus,
  IconEdit,
  IconEye,
  IconBuilding,
} from "@tabler/icons-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin Hotel",
    email: "admin@hotel.com",
    avatar: "/avatars/hotel-admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Gestión de Habitaciones",
      url: "/habitaciones",
      icon: IconBed,
      items: [
        {
          title: "Ver Todas",
          url: "/habitaciones",
          icon: IconEye,
        },
        {
          title: "Nueva Habitación",
          url: "/habitaciones/nueva",
          icon: IconPlus,
        },
        {
          title: "Modificar Habitación",
          url: "/habitaciones/editar",
          icon: IconEdit,
        },
        {
          title: "Mantenimiento",
          url: "/habitaciones/mantenimiento",
          icon: IconTool,
        },
      ],
    },
    {
      title: "Reservaciones",
      url: "/reservaciones",
      icon: IconCalendarEvent,
      items: [
        {
          title: "Todas las Reservaciones",
          url: "/reservaciones",
          icon: IconEye,
        },
        {
          title: "Solicitudes Pendientes",
          url: "/reservaciones/solicitudes",
          icon: IconClipboardList,
        },
        {
          title: "Nueva Reservación",
          url: "/reservaciones/nueva",
          icon: IconPlus,
        },
      ],
    },
    {
      title: "Configuración",
      url: "/configuracion",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconBuilding className="!size-5 text-red-600" />
                <span className="text-base font-semibold text-gray-900">
                  Hotel Manager
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
