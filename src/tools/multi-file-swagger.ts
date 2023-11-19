import YAML from "yamljs";
import { resolveRefs } from "json-refs";

export const multiFileSwagger = (root: object | any[]) => {
  const options = {
    filter: ["relative", "remote"],
    location: "../swagger/api.yaml",
    loaderOptions: {
      processContent(res: any, callback: CallableFunction) {
        callback(null, YAML.parse(res.text));
      },
    },
  };

  return resolveRefs(root, options).then(
    (results: any) => {
      return results.resolved;
    },
    (err: any) => {
      throw err;
    },
  );
};
