import Image from "next/image"

import { cn } from "@/lib/utils"

type ProfileImageProps = {
  /** Display shape — medium hero portrait, circular avatar, or rounded portrait. */
  variant?: "hero" | "avatar" | "portrait"
  className?: string
  /** Load eagerly (e.g. hero above the fold). */
  priority?: boolean
}

/**
 * Personal profile photo. Source is a square 1254×1254 PNG served from
 * /public/images/profile.png so it can be optimized and responsively
 * scaled by `next/image`.
 */
export function ProfileImage({
  variant = "hero",
  className,
  priority = false,
}: ProfileImageProps) {
  return (
    <Image
      src="/images/profile.png"
      alt="Kanwal M. Umer - Full Stack Developer and AI Engineer"
      width={1254}
      height={1254}
      priority={priority}
      sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 40vw"
      className={cn(
        "object-cover",
        variant === "hero" &&
          "aspect-square w-full max-w-[17rem] rounded-2xl bg-muted ring-1 ring-border shadow-sm sm:max-w-xs md:max-w-[22rem] lg:max-w-[28rem]",
        variant === "avatar"
          ? "size-24 rounded-full ring-1 ring-border md:size-28"
          : variant === "portrait" && "aspect-square rounded-2xl ring-1 ring-border",
        className
      )}
    />
  )
}