import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        States of mind, what if the soul really exists? <br />
        Thanks to all who supported me to make music during this hard time,
        especially to my love and the author of the cover artwork.
        <br />
        <br />
        <br />
        All tracks were written & recorded in 2022. Live saxophone. Artwork by
        Streletss.
        <br />
        Released February 14, 2023.
      </p>
    </AlbumPageLayout>
  );
}
