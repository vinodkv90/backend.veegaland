import CheckComponentsExist from "./checkComponentsExist";
import definitions from "./definitions";
import mappings from "./mapping";

const GetWidgetsData = async (paramObj) => {
  let i = 1;
    let widgets = paramObj?.widgets;
    // console.log("Add wigets to widget mapper", widgets);

    await CheckComponentsExist(widgets?.map((data) => data?.__component));

    let paramobject = paramObj;

    if (typeof widgets == "undefined" || !widgets || widgets?.length <= 0) {
      return null;
    }

    let requestDevice = strapi.requestContext.get().request.headers["device"];
    // console.log("requestDevice.....", requestDevice);

    let structuredWidgets = [];
    for (let widget of widgets) {
      try {
        if (widget?.enable_component === false) {
          continue;
        }

        if (
          requestDevice &&
          typeof widget?.device !== "undefined" &&
          widget?.device !== null
        ) {
          if (requestDevice == "mobile" && widget?.device !== "mobile only") {
            continue;
          } else if (
            requestDevice == "desktop" &&
            widget?.device !== "desktop only"
          ) {
            continue;
          }
        }

        let cloneDefinition = Object.assign({}, definitions);

        let structuredWidget = await cloneDefinition[
          mappings[widget?.__component]
        ](widget, paramobject?.pageData);

        structuredWidgets?.push(structuredWidget);
      } catch (err) {
        console.log(err);
      }
      i++;
    }
    return structuredWidgets;

}

export default GetWidgetsData