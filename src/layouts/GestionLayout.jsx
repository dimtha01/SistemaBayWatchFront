import { SiteHeader } from "../modules/GestionHotel/ui/site_header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../modules/GestionHotel/ui/app-sidebar"
import { Outlet } from "react-router-dom";

export const GestionLayout = () => {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                }
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
