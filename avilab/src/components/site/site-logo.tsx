import Image, { type ImageProps } from "next/image"
import aviLabLogo from "../../../public/AviLabLogo.png"
import { cn } from "@/lib/utils"

type SiteLogoProps = {
  alt: string
  className?: string
  priority?: ImageProps["priority"]
}

export function SiteLogo({ alt, className, priority }: SiteLogoProps) {
  return (
    <Image
      src={aviLabLogo}
      alt={alt}
      width={aviLabLogo.width}
      height={aviLabLogo.height}
      priority={priority}
      unoptimized
      className={cn("h-22 w-auto object-contain", className)}
    />
  )
}
