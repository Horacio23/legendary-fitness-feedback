"use client"

import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface ThankYouModalProps {
    children: React.ReactNode,
    onConfirm: () => void
}

export const ThankYouModal = ({
    children,
    onConfirm
}: ThankYouModalProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
               {children} 
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Thank you!!!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your feedback helps us be our best!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center">
                    <AlertDialogAction onClick={onConfirm} className="bg-red-900 w-[150px]">
                        Finish
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}