import { title } from "process"
import GetImage from "./getImage"

export default {
    async featuredAppartment(data): Promise<any> {
        return {
            id: data?.id,
            widget_type: 'featuredAppartmentWidget',
            data: await Promise.all(
                data?.section?.map(async (item) => {
                    return {
                        title: item?.title,
                        description: data?.description,
                        floor: item?.floor,
                        apartment_status: item?.apartment_status,
                        image: await GetImage(item?.image),
                        logo: await GetImage(item?.logo),
                        button: item?.button,
                        krera: await GetImage(item?.krera),
                        whatsapp: item?.whatsapp
                    }
                })
            ),
            component: data?.__component
        }
    },
    async appartmentSections(data) {
        return {
            id: data?.id,
            widget_type: 'appartmentSectionsWidget',
            data: {
                title: data?.title,
                description: data?.description,
                floor: data?.floor,
                apartment_status: data?.apartment_status,
                image: await GetImage(data?.image),
                logo: await GetImage(data?.logo),
                button: data?.button,
                krera: await GetImage(data?.krera),
                whatsapp: data?.whatsapp
            },
            component: data?.__component
        }
    },
    async ourCustomers(data) {
        return {
            id: data?.id,
            widget_type: 'ourCustomersWidget',
            data: {
                title: data?.title,
                description: data?.description,
                handovers: await Promise.all(
                    data?.handovers?.map(async (item) => {
                        return {
                            title: item?.title,
                            description: item?.description,
                            yt_video_url: item?.video_url,
                            images: await Promise.all(
                                item?.images?.map(async (img) => {
                                    return await GetImage(img.image)
                                })
                            ) || []
                        }
                    }) || []
                ),
                testimonials: data?.testimonials?.map((item) => {
                    return {
                        title: item?.title,
                        description: item?.description,
                        yt_video_url: item?.media_url
                    }
                }) || []
            },
            component: data?.__component
        }
    },
    async trust(data) {
        return {
            id: data?.id,
            widget_type: 'trustWidget',
            data: {
                title: data?.title,
                message: data?.message,
                image: await GetImage(data?.image),
                descriptions: data?.description?.map((desc) => {
                    return {
                        id: desc?.id,
                        description: desc?.description
                    }
                }) || []
            },
            component: data?.__component
        }
    }
}