import { useStore } from "../src/store";

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
};

const jsonToFormData = (data) => {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
};

const fileToBase64 = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};

const base64ToFile = async (base64, fileName) => {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
};

// String.prototype.toHex = () => {
//   var hash = 0;
//   if (this.length === 0) return hash;
//   for (var i = 0; i < this.length; i++) {
//     hash = this.charCodeAt(i) + ((hash << 5) - hash);
//     hash = hash & hash;
//   }
//   var color = "#";
//   for (var i = 0; i < 3; i++) {
//     var value = (hash >> (i * 8)) & 255;
//     color += ("00" + value.toString(16)).substr(-2);
//   }
//   return color;
// };

export { validateEmail, jsonToFormData, fileToBase64, base64ToFile };
