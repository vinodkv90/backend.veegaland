import urlJoin from "url-join";

const GetImageUrl = async (img) => {
    if(!img) {
        return null;
    }
    return urlJoin(`${process.env.BASE_URL}${img?.url}`);
}

export default GetImageUrl