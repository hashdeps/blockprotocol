import {
  Box,
  Container,
  Grid,
  Paper,
  PaperProps,
  Typography,
} from "@mui/material";
import Image from "next/legacy/image";
import { FunctionComponent, ReactNode } from "react";

import backgroundCornerHelix from "../../public/assets/background-corner-helix.png";
import { FadeInOnViewport } from "./fade-in-on-viewport";
import { ArrowRightIcon, BoltIcon } from "./icons";
import { Link as LinkComponent, LinkProps } from "./link";
import { LinkButton } from "./link-button";
import { FinalCTA } from "./pages/home/final-cta";
import { RequestAnotherApplication } from "./pages/wordpress/request-another-application";

type Banner = {
  shouldDisplay: (params: { pathname: string; asPath: string }) => boolean;
  contents: ReactNode;
  overlapsFooter?: boolean;
  hideWhenSignedIn?: boolean;
};

type BannerCardProps = {
  sx?: PaperProps["sx"];
  contents: ReactNode;
  buttonHref?: string;
  buttonText?: ReactNode;
  buttonStartIcon?: ReactNode;
  buttonEndIcon?: ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

const Link: FunctionComponent<LinkProps> = (linkProps) => (
  <Typography
    component="span"
    sx={{
      "> a": {
        borderBottomWidth: 0,
      },
    }}
  >
    <LinkComponent {...linkProps} />
  </Typography>
);

const BackgroundHelix: FunctionComponent = () => {
  return (
    <Image
      objectFit="contain"
      objectPosition="right"
      src={backgroundCornerHelix}
    />
  );
};
const BackgroundBlocks: FunctionComponent = () => {
  return (
    <Image
      objectFit="contain"
      objectPosition="right"
      src="https://static.blockprotocol.com/cdn-cgi/imagedelivery/EipKtqu98OotgfhvKf6Eew/68cb4318-cbc4-4171-3b1c-80eda9f45200/github"
      width={567}
      height={768}
    />
  );
};

const BannerCard: FunctionComponent<BannerCardProps> = ({
  sx = [],
  contents,
  buttonHref,
  buttonText,
  buttonStartIcon,
  buttonEndIcon,
  fullWidth,
  fullHeight,
}) => (
  <Paper
    sx={[
      {
        transition: (theme) => theme.transitions.create("padding"),
        padding: { xs: 4, md: 6 },
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          content: `""`,
          /** @todo: figure out IE compatibility? (https://caniuse.com/mdn-css_properties_mix-blend-mode) */
          mixBlendMode: "multiply",
          boxShadow: [
            "0px 4.46px 3px 0px #7F8FAB1F",
            "0px 14.97px 16px 0px #7F8FAB33",
            "0px 67px 60px 0px #7F8FAB4D",
          ].join(","),
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <FadeInOnViewport
      sx={{
        width: fullWidth ? 1 : "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: 1,
          display: "flex",
          mb: fullHeight ? 0 : 2,
        }}
      >
        {contents}
      </Box>
      {buttonHref ? (
        <LinkButton
          href={buttonHref}
          sx={{
            textTransform: "none",
          }}
          variant="primary"
          startIcon={buttonStartIcon}
          endIcon={buttonEndIcon}
        >
          {buttonText}
        </LinkButton>
      ) : null}
    </FadeInOnViewport>
  </Paper>
);

export const BANNERS: Banner[] = [
  {
    shouldDisplay: ({ pathname }) => pathname === "/",
    overlapsFooter: true,
    contents: (
      <BannerCard
        sx={{
          padding: "0 !important",
        }}
        contents={<FinalCTA />}
        fullHeight
        fullWidth
      />
    ),
  },
  {
    shouldDisplay: ({ pathname }) => pathname === "/hub",
    overlapsFooter: true,
    contents: (
      <BannerCard
        sx={{
          padding: (theme) => ({
            xs: theme.spacing(5),
            sm: theme.spacing(6),
            md: theme.spacing(8),
          }),
        }}
        contents={
          <Box mb={2}>
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                top: 0,
                right: 0,
                opacity: {
                  md: 1,
                  xs: 0,
                },
                transition: (theme) => theme.transitions.create("opacity"),
                "> span": {
                  maxHeight: "100%",
                },
              }}
            >
              <BackgroundBlocks />
            </Box>

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                component="h2"
                variant="bpHeading2"
                sx={{ fontWeight: 700 }}
              >
                Can’t find a block you need?
              </Typography>
              <Typography
                component="h2"
                variant="bpHeading2"
                sx={{
                  fontWeight: 700,
                  color: ({ palette }) => palette.gray[70],
                  mb: 2,
                }}
              >
                Build it!
              </Typography>
              <Typography
                component="p"
                variant="bpBodyCopy"
                sx={{ maxWidth: 650 }}
              >
                Anyone can create blocks and contribute to this growing,
                open-source registry of blocks. Read our{" "}
                <Link href="/docs/blocks/develop">quickstart guide</Link> to
                start building your own blocks.
              </Typography>
            </Box>
          </Box>
        }
        buttonHref="/docs/blocks/develop"
        buttonText="Read the quickstart guide"
        buttonStartIcon={<BoltIcon />}
      />
    ),
  },
  {
    shouldDisplay: ({ asPath }) => asPath.startsWith("/docs/spec"),
    overlapsFooter: true,
    contents: (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BannerCard
            contents={
              <Box mb={2}>
                <Typography
                  component="h2"
                  variant="bpHeading2"
                  sx={{ fontWeight: 700, marginBottom: 2 }}
                >
                  Add blocks to your app
                </Typography>
                <Typography component="p" variant="bpBodyCopy">
                  Anyone with an existing application who wants to embed
                  semantically-rich, reusable blocks in their product can use
                  the protocol. Improve your app’s utility and tap into a world
                  of structured data with no extra effort, for free.{" "}
                </Typography>
              </Box>
            }
            buttonHref="/docs/blocks/environments"
            buttonText="Learn more"
            buttonEndIcon={<ArrowRightIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BannerCard
            contents={
              <Box mb={2}>
                <Typography
                  component="h2"
                  variant="bpHeading2"
                  sx={{ fontWeight: 700, marginBottom: 2 }}
                >
                  Build your own blocks
                </Typography>
                <Typography component="p" variant="bpBodyCopy">
                  Any developer can build and publish blocks to the{" "}
                  <Link href="/hub">Hub</Link> for others to use. Contribute to
                  an open-source community building a more interoperable future
                  web.
                </Typography>
              </Box>
            }
            buttonHref="/docs/blocks/develop"
            buttonText="Read the quickstart guide"
            buttonStartIcon={<BoltIcon />}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    shouldDisplay: ({ pathname }) =>
      pathname.startsWith("/[shortname]/blocks/"),
    overlapsFooter: true,
    contents: (
      <BannerCard
        sx={{
          padding: (theme) => ({
            xs: theme.spacing(4),
            md: theme.spacing(8),
          }),
        }}
        contents={
          <Box mb={2}>
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                top: 0,
                right: 0,
                opacity: {
                  md: 1,
                  xs: 0,
                },
                transition: (theme) => theme.transitions.create("opacity"),
                "> span": {
                  maxHeight: "100%",
                },
              }}
            >
              <BackgroundHelix />
            </Box>

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                component="h2"
                variant="bpHeading2"
                sx={{ fontWeight: 700 }}
              >
                Ready to build your own blocks?
              </Typography>
              <Typography
                component="h2"
                variant="bpHeading2"
                sx={{
                  fontWeight: 700,
                  color: ({ palette }) => palette.gray[70],
                }}
              >
                Anyone can contribute
              </Typography>
              <Typography
                component="p"
                variant="bpBodyCopy"
                sx={{ maxWidth: 650 }}
              >
                Anyone can create blocks and contribute to this growing,
                open-source registry of blocks. Read our{" "}
                <Link href="/docs/blocks/develop">quickstart guide</Link> to
                start building your own blocks.
              </Typography>
            </Box>
          </Box>
        }
        buttonHref="/docs/blocks/develop"
        buttonText="Read the quickstart guide"
        buttonStartIcon={<BoltIcon />}
      />
    ),
  },
  {
    shouldDisplay: ({ pathname }) => pathname.startsWith("/wordpress"),
    overlapsFooter: true,
    contents: (
      <BannerCard
        sx={{
          py: (theme) => ({
            xs: theme.spacing(3),
            md: theme.spacing(6),
          }),
          px: (theme) => ({
            xs: theme.spacing(4),
            md: theme.spacing(9.5),
          }),
        }}
        contents={
          <Box width={1}>
            <RequestAnotherApplication />
          </Box>
        }
        fullWidth
      />
    ),
  },
  {
    shouldDisplay: ({ pathname }) => pathname === "/pricing",
    overlapsFooter: true,
    contents: (
      <BannerCard
        sx={{
          padding: "0 !important",
        }}
        contents={<FinalCTA />}
        fullHeight
        fullWidth
      />
    ),
    hideWhenSignedIn: true,
  },
];

type FooterBannerProps = {
  banner: Banner;
};

export const FooterBanner: FunctionComponent<FooterBannerProps> = ({
  banner,
}) => (
  <Box
    sx={{
      paddingTop: banner.overlapsFooter ? 0 : 8,
      background: `radial-gradient(ellipse at 10% 130%, #9672FF 0%, #9482FF 50.15%, #DF84FF 100%)`,
    }}
    data-test-id="footerCTA"
  >
    <Container
      sx={{
        paddingTop: {
          xs: banner.overlapsFooter ? 8 : 0,
          md: banner.overlapsFooter ? 10 : 0,
        },
        marginBottom: banner.overlapsFooter ? -8 : 0,
      }}
    >
      {banner.contents}
    </Container>
  </Box>
);
