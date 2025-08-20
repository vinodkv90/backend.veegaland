import urlJoin from "url-join";

const GetImageAlt = async (img) => {
    if (img) {
      return img?.alternativeText || "A featured image for this section";
    }
    return null;
}

export default GetImageAlt