"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    const [imageLoaded, setImageLoaded] = React.useState(false)
    
    const sizeClasses = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm", 
      lg: "h-12 w-12 text-base"
    }

    const showImage = src && imageLoaded && !imageError

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          <Image
            src={src}
            alt={alt || "Avatar"}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            sizes={size === "sm" ? "32px" : size === "md" ? "40px" : "48px"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-medium">
            {fallback}
          </div>
        )}
        
        {/* Preload image if src is provided but not yet loaded */}
        {src && !showImage && !imageError && (
          <Image
            src={src}
            alt={alt || "Avatar"}
            fill
            className="object-cover opacity-0"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            sizes={size === "sm" ? "32px" : size === "md" ? "40px" : "48px"}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

export { Avatar }