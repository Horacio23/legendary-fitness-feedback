"use client"

import ReactConfetti from "react-confetti"

import { useConfettiStore } from "@/hooks/use-confetti-store"

export const ConfettiProvider = () => {
    const confetti = useConfettiStore()

    if(!confetti.isOpen) return null

    return (
        <ReactConfetti 
            className="relative pointer-events-none z-[900] w-full h-full"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() =>{
                confetti.onClose()
            }}
        />
    )
}