import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Layout = ({childern }: { childern: React.ReactNode} ) => {

return (
    <SidebarProvider>

        <AppSidebar />
        <SidebarInset className="bg-accent/20">{childern}</SidebarInset>

    </SidebarProvider>
)
}

export default Layout