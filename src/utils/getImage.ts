import urlJoin from "url-join";
import GetImageAlt from "./getImageAlt";

const GetImage = async (img) => {
    if(!img) {
        return null;
    }
    return {
        url: urlJoin(`${process.env.BASE_URL}${img?.url}`),
        alt: await GetImageAlt(img),
        width: img?.width || 0,
        height: img?.height || 0,
    };
}

export default GetImage