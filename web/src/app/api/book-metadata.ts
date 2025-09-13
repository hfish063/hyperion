import apiFetch from "./api";

export async function searchForWork(workId: string) {
  const results = await apiFetch(`/meta/works/${workId}`);
  const data = (await results.json()) as BookMetadata;
  return data;
}

export type BookMetadata = {
  title: string;
  description: BookDescription;
  first_publish_date: string;
  links: BookMetadataLink[];
  subjects: string[];
  covers: string[];
};

export type BookMetadataLink = {
  title: string;
  url: string;
};

type BookDescription = {
  value: string;
};
