import GetImage from "./getImage"

export default {
    async featuredAppartment(data): Promise<any> {
        // return data
        return {
            widget_type: 'featuredAppartment',
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
        return data
    },
    async ourCustomers(data) {
        return data
    },
    async trust(data) {
        // return data
        return {
            widget_type: 'trust',
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