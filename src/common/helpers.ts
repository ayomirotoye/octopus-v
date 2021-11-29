export const encryptStorage = sessionStorage;

export const isEmptyArray = (val: any) => {
  return val === null || val === undefined || val.length === 0;
};

export const isNullOrUndefined = (val: any) => {
  return val === null || val === undefined || val === {};
};

export const isEmptyString = (val: any) => {
  return val === null || val === undefined || val.length === 0;
};
export const capitaliseFirstLetter = (val: string) => {
  let res = val;
  if (!isEmptyString(val)) {
    res = val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val;
  }
  return res;
};

export const camelCaseToSentenceCase = (val: string) => {
  let res = "";
  try {
    if (!isEmptyString(val)) {
      res = val.replace(/([a-zA-Z])(?=[A-Z])/g, "$1 ");
    }
  } catch (error) {
    console.log("ERROR OCCURRED WHILE PARSING:::", error);
  }

  return capitaliseFirstLetter(res);
};

export const isObject = (item: any) => {
  return (
    typeof item === "object" &&
    !Array.isArray(item) &&
    item !== null &&
    item !== undefined
  );
};

export const skipObject = (arrOfVals: any, objVal: any) => {
  let newObj: any = {};
  if (arrOfVals.length === 0) {
    for (const [keys, values] of Object.entries(objVal)) {
      newObj = Object.assign({}, newObj, {
        [keys]: values,
      });
    }
    return newObj;
  } else {
    for (const [keys, values] of Object.entries(objVal)) {
      if (!arrOfVals.includes(keys)) {
        newObj = Object.assign({}, newObj, {
          [keys]: values,
        });
      }
    }
    return newObj;
  }
};
export const cherryPickObject = (arrOfVals: any, objVal: any) => {
  let newObj: any = {};
  for (const [keys, values] of Object.entries(objVal)) {
    if (arrOfVals.includes(keys)) {
      newObj = Object.assign({}, newObj, {
        [keys]: values,
      });
    }
  }
  return newObj;
};

export const hasKeys = (objVal: any) => {
  return !isNullOrUndefined(objVal) && Object.entries(objVal).length > 0;
};
export const isKeyPresent = (objVal: any, requiredKey: string) => {
  return !isNullOrUndefined(objVal) && objVal[requiredKey];
};
export const isSuccessful = (val: any) => {
  return (
    (val !== null && val !== undefined && val === "00") ||
    val === true ||
    String(val).toLowerCase() === "successful"
  );
};
export const isEkedpSuccessful = (statusCodeValue: string) => {
  return (
    !isNullOrUndefined(statusCodeValue) &&
    statusCodeValue.toLowerCase().includes("confirmed")
  );
};

export const isPending = (val: any) => {
  return val !== null && val !== undefined && val;
};

export const doAuthentication = () => {
  let userLoginStatus = encryptStorage.getItem("isLoggedIn");
  if (userLoginStatus !== null && ["true", true].includes(userLoginStatus)) {
    return true;
  }
  return null;
};

export const doAuthorization = (url: string) => {
  let accessibleMenus: any = encryptStorage.getItem("accessibleMenus");
  let authorized = false;
  if (!isNullOrUndefined(accessibleMenus) && accessibleMenus.length > 0) {
    let checkerArr = accessibleMenus.filter(
      (obj: any) => obj.menuController === url
    );
    if (checkerArr && checkerArr.length > 0) {
      authorized = true;
    }
  }
  return authorized;
};

function convertArrayOfObjectsToCSV(array: any, columnHeaders: any[]) {
  let result: any;
  let headerString = "";

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = !isNullOrUndefined(array) ? Object.keys(array[0]) : [];

  console.log("KEYSSS:::", keys);
  result = "";

  for (let i = 0; i < keys.length; i++) {
    if (columnHeaders.includes(keys[i])) {
      headerString += defineHeaderValue(String(keys[i])).concat(
        i === keys.length - 1 ? "" : columnDelimiter
      );
    }
  }
  headerString += lineDelimiter;

  array.forEach((item: { [x: string]: any }) => {
    let ctr = 0;
    columnHeaders.forEach((key) => {
      // if (ctr > 0){
      result += item[key] + columnDelimiter;

      // ctr++;
      // }
    });
    result += lineDelimiter;
  });

  return { body: result, header: headerString };
}

export const defineHeaderValue = (val: string) => {
  let definedVal = val;
  if (val === "createdAt") {
    definedVal = "Date";
  } else if (val === "stdToken") {
    definedVal = "ems receipt / token";
  }

  return camelCaseToSentenceCase(definedVal).toUpperCase();
};

export const downloadCSV = (array: any, columnHeaders: any[]) => {
  console.log("ARRAY OF RECORDS:::", array);
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array, columnHeaders);
  console.log("CSV:::", csv);
  if (csv.body == null) return;

  const filename = "export.csv";
  let csvBody = csv.body;
  if (!csvBody.match(/^data:text\/csv/i)) {
    var BOM = "\uFEFF";
    csvBody = BOM + csvBody;
    csvBody = `data:text/csv;charset=utf-8,${csv.header+csvBody}`;
  }

  link.setAttribute("href", encodeURI( csvBody));
  link.setAttribute("download", filename);
  link.click();
};
