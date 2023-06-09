import { LucideProps } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";

type LinkAnchorIntersection = LinkProps & HTMLAnchorElement;

interface NavMenuItemProps {
  href: LinkAnchorIntersection["href"];
  external?: boolean;
  label: string;
  icon: LucideProps | string;
}

const NavMenuItem = ({
  icon,
  href,
  external = false,
  label,
}: NavMenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li
      className={`${
        pathname === (href || "/") ? "underline underline-offset-1" : ""
      }`}
    >
      <Link
        href={href}
        target={external ? "_blank" : "_self"}
        className="flex items-center gap-2"
      >
        <>
          {icon} {label}
        </>
      </Link>
    </li>
  );
};

export default NavMenuItem;
