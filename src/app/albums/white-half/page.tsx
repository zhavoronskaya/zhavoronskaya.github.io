import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Compilation of two albums on Vinyl LP. <br />
        One of them is the re-released EP “Gone Beyond” which transmits some
        personal feelings about coexisting with the marine world. The second is
        inspired by Arab world and long-standing love for Muslimgauze. Worked
        with materials from three wars in the East (Syria, Iraq, and Chechnya).{" "}
        <br />
        Used a lot of various stringed instruments like gusli, finish kantele,
        and field recordings. <br />
        <br />
        <br />
        Mastered by Edward Sol, artwork by Empty House.
        <br />
        Released November 21, 2020.
      </p>
    </AlbumPageLayout>
  );
}
