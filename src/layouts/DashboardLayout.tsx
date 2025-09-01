import { SiteHeader } from "../modules/Dashboard/ui/site_header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../modules/Dashboard/ui/app-sidebar"
import { Outlet } from "react-router-dom";



export const DashboardLayout = () => {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <Outlet />

            </SidebarInset>
        </SidebarProvider>
    )
}
