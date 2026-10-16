import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "border border-primary bg-primary text-foreground shadow-lg shadow-secondary/20 hover:bg-transparent hover:text-primary hover:border-primary hover:shadow-glow-primary",
  secondary:
    "border border-border/70 bg-popover text-foreground shadow-xs hover:border-secondary hover:text-secondary",
  dark:
    "border border-foreground/20 bg-foreground text-background shadow-md hover:bg-foreground/85 hover:border-secondary/40 hover:text-background hover:shadow-lg",
  outline:
    "border border-primary/35 bg-foreground/60 text-primary shadow-md backdrop-blur-md hover:border-primary hover:bg-primary hover:text-foreground hover:shadow-glow-primary-sm",
  ghost:
    "border border-transparent text-background/75 hover:bg-background/10 hover:text-background",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 sm:px-7 py-3 sm:py-3.5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const combinedClasses = `inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 cursor-pointer active:scale-95 disabled:pointer-events-none disabled:opacity-60 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return (
        <Link href={href} className={combinedClasses} {...linkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={combinedClasses} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
