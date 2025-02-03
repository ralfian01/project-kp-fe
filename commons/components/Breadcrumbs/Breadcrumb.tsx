"use client";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
  pageName: string;
  backToLink?: string;
  backTo?: any;
  goBack?: boolean;
}

const Breadcrumb = ({
  pageName,
  backToLink,
  backTo,
  goBack,
}: BreadcrumbProps) => {
  const routerNav = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex">
        {backToLink ? (
          <Link href={backToLink} className="mr-4">
            <ChevronLeftIcon style={{ width: "25px", strokeWidth: "3px" }} />
          </Link>
        ) : backTo || goBack ? (
          <button
            onClick={
              goBack
                ? () => {
                    routerNav.back();
                  }
                : backTo
            }
            className="mr-4"
          >
            <ChevronLeftIcon style={{ width: "25px", strokeWidth: "3px" }} />
          </button>
        ) : (
          ""
        )}
        <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
          {pageName}
        </h2>
      </div>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
