import React from "react";
import Link from "next/link";

import { IAlbum } from "@/interfaces";
import { LayoutWithSidebar } from "../layout/Layout";
import styles from "./AlbumPageLayout.module.css";
import { LeftArrowIcon, RightArrowIcon } from "../theme/Icon/Arrows";

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
};

export default function AlbumPageLayout(props: Props) {
  return (
    <LayoutWithSidebar contentHeader={<AlbumsNav {...props} />}>
      <div>
        {/* <h2 className="py20">{props.album.name}</h2> */}

        <img src={props.album.cover} alt="Album" />

        <div dangerouslySetInnerHTML={{ __html: props.album.bandcamp }} />

        <p dangerouslySetInnerHTML={{ __html: props.album.description }}></p>
        <p className="mt-sm mb-sm op-04 fz-sm">{props.album.genre}</p>
      </div>
    </LayoutWithSidebar>
  );
}

const AlbumsNav = (props: Props) => {
  return (
    <div className={styles.nav}>
      {props.prevAlbumSlug && (
        <Link href={`/albums/${props.prevAlbumSlug}`}>
          <LeftArrowIcon />
        </Link>
      )}

      <h2 className="text-ellipsis">{props.album.name}</h2>

      {props.nextAlbumSlug && (
        <Link href={`/albums/${props.nextAlbumSlug}`}>
          <RightArrowIcon />
        </Link>
      )}
    </div>
  );
};
