import widgets from "./mapping";

const CheckComponentsExist = async (components) => {
  const missingComponents = components?.filter((key) => !widgets[key]);

  if (missingComponents?.length != 0) {
    console.log("❌ Missing components:", missingComponents);
  }

}

export default CheckComponentsExist