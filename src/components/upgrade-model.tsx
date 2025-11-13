"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import {authClient} from "@/lib/auth-client";


interface UpgradeModelProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const  UpgradeModel = ({ open, setOpen }: UpgradeModelProps) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                    <AlertDialogDescription>
You need an active subscription to use this feature. Upgrade to Pro to get access to all features.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={() => authClient.checkout({
                        slug: "pro"
                    })}
                    >Upgrade</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>  
    )
}