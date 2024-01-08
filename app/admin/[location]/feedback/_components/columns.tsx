"use client"

import { Button } from "@/components/ui/button"
import { Feedback } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "firstTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Workout
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const firstTime = row.getValue("firstTime") || false
        return (
            <Badge className={cn(
                "bg-slate-500",
                firstTime && 'bg-sky-700'
            )}>
                {firstTime ? "New Member" : "Regular"}
            </Badge>
        )
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Average Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    id: 'averageRating',
    accessorFn: ( row ) => {
      const validRatings = [row.workoutRating, row.cleanlinessRating, row.returnRating, row.recommendationRating, row.coachRating].filter((num)=>num!==0)
      const averageRating = validRatings.length > 0 ? validRatings.reduce((a,b)=> a+b) / validRatings.length : 0
      return averageRating
    }
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
