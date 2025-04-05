import { getCurrentUserQuery } from "#client/tanstack/query/queries/public/current_user";
import { ImagePicker } from "#pages/image_picker";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";

export const Route = createFileRoute("/image-picker/")({
  loader: async ({ context: { queryClient } }) => {
    const query = getCurrentUserQuery;

    await queryClient.ensureQueryData(query);

    return {
      crumb: "Image picker",
      query,
      seoDescription:
        "Quickly and easily generate a color palette by extracting the main components from an image",
      seoTitle: "Your Color From Image generator",
    };
  },
  component: PageWrapper,
});

function PageWrapper(): JSX.Element {
  const { query } = Route.useLoaderData();
  const {
    data: { user },
  } = useSuspenseQuery(query);

  console.log({ user });

  return <ImagePicker user={user} />;
}
