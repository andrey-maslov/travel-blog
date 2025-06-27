import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "./api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // perspective: "published",
  // token, // Required if you have a private dataset
  // stega: { // visual editing ???
  //   studioUrl,
  //   // Set logger to 'console' for more verbose logging
  //   // logger: console,
  //   filter: (props: any) => {
  //     if (props.sourcePath.at(-1) === "title") {
  //       return true;
  //     }
  //
  //     return props.filterDefault(props);
  //   },
  // },
});
