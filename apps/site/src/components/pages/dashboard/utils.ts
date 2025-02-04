import { faKey, faUserPen } from "@fortawesome/free-solid-svg-icons";

import { SolidSparklesIcon } from "../../icons/solid-sparkles-icon";
import { DashboardCardProps } from "./dashboard-card/dashboard-card";

export const dashboardPages: { tabTitle: string; tabHref: string }[] = [
  {
    tabTitle: "Dashboard",
    tabHref: "/dashboard",
  },
  {
    tabTitle: "My Account",
    tabHref: "/account",
  },
];

export type DashboardSection = "create" | "manage" | "explore";

export const getDashboardSectionCards = (props: {
  profileLink: string;
}): Record<DashboardSection, DashboardCardProps[]> => {
  return {
    create: [
      {
        title: "Build a block",
        colorGradient:
          "linear-gradient(291.34deg, #FFB172 -4.12%, #D082DE 53.49%, #9482FF 91.74%, #84E6FF 151.68%)",
        colorGradientOnHover:
          "linear-gradient(292.67deg, #FFB172 44.38%, #D082DE 83.44%, #9482FF 109.38%, #84E6FF 150.02%)",
        description:
          "Read the quickstart guide and learn how to create and use blocks",
        link: {
          title: "Read the guide",
          href: "/docs/blocks/develop",
        },
      },
      {
        title: "View your blocks",
        colorGradient:
          "linear-gradient(310.17deg, #FFB172 -167.67%, #9482FF 13.54%, #84E6FF 126.83%)",
        colorGradientOnHover:
          "linear-gradient(304.41deg, #FFB172 -167.57%, #9482FF -22.66%, #84E6FF 53.07%)",
        description: "Browse your blocks or publish a new one to the Þ Hub",
        link: {
          title: "View your blocks",
          href: `${props.profileLink}/blocks`,
        },
      },
      {
        title: "Create a Type",
        colorGradient:
          "linear-gradient(91.21deg, #FFB172 -84.62%, #9482FF 62.56%, #84E6FF 154.58%)",
        colorGradientOnHover:
          "linear-gradient(91.21deg, #FFB172 -84.54%, #9482FF 27.8%, #84E6FF 98.03%)",
        description:
          "Types are a formal way to describe data, links, properties and entities",
        link: {
          title: "Create a Type",
          href: `${props.profileLink}/types`,
        },
      },
    ],
    manage: [
      {
        title: "Create and manage API keys",
        description:
          "Your API key will allow you to search and discover blocks by name, author, or compatible data structure",
        link: {
          title: "Manage keys",
          href: "/account/api",
        },
        icon: faKey,
        variant: "secondary",
      },
      {
        /** @todo show "Complete your public profile" when profile details are editable */
        title: "View your public profile",
        description:
          "Your bio and links help others discover your work, and appear alongside your public types and blocks",
        link: {
          title: "View Profile",
          href: props.profileLink,
        },
        icon: faUserPen,
        variant: "secondary",
      },
    ],
    explore: [
      {
        title: "Browse blocks for inspiration",
        description:
          "View and test our the most popular blocks on the Hub to see how they work",
        link: {
          title: "Browse blocks",
          href: "/hub",
        },
        CustomIcon: SolidSparklesIcon,
        variant: "secondary",
      },
      /** @todo uncomment when searching types are available  */
      // {
      //   title: "Search public types",
      //   description:
      //     "Rather than create new types from scratch, you can also fork or extend existing ones",
      //   link: {
      //     title: "Search types",
      //     href: "",
      //   },
      //   icon: faMagnifyingGlass,
      //   variant: "secondary",
      // },
    ],
  };
};
