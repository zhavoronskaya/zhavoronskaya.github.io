// @ts-expect-error
import description from "./description.html";
import { IAlbum } from "../../../interfaces";

const album: IAlbum = {
  name: "Sputnik LELL 22",
  slug: "sputnik",
  description,
  cover: "/albums/sputnik.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=1980322120/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/sputnik-lell-22">SPUTNIK LELL 22 by Zhavoronskaia/Ruins of Melancholia</a></iframe>`,
};
export default album;
