import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ childern }: { childern: React.ReactNode }) => {
  return (
    <>
      <main>
        <AppHeader />
        <main className="flex-1">
            {childern}
        </main>
      </main>
    </>
  );
};

export default Layout;
