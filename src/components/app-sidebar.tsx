"use client";

import {
  CreditCard,
  FolderOpen,
  History,
  Key,
  ListStart,
  LogOut,
  MoonStar,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpen,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: Key,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: History,
        url: "/executions",
      },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <Image
                src="/logos/logo.svg"
                alt="nodebase"
                width={32}
                height={32}
              />
              <span className="font-semibold text-sm">Nodebase</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Upgrade to Pro"
            asChild
            className="gap-x-4 h-10 px-4"
            onClick={() => {}}
          >
            <div className="flex items-center gap-2">
              <MoonStar className="size-4" />
              <span>Upgrade to Pro</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Billing Portal"
            asChild
            className="gap-x-4 h-10 px-4"
            onClick={() => {}}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <span>Billing Portal</span>
            </div>
          </SidebarMenuButton>
          <SidebarMenuButton
            tooltip="Sign Out"
            asChild
            className="gap-x-4 h-10 px-4"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login");
                  },
                },
              })
            }
          >
            <div className="flex items-center gap-2">
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
};
