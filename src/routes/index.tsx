import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/news/$slug", params: { slug: "mp-industrial-growth" } });
  },
  component: () => null,
});
