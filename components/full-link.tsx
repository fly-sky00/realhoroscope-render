import type { AnchorHTMLAttributes, ReactNode } from "react";

type FullLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export function FullLink({ href, children, ...props }: FullLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
