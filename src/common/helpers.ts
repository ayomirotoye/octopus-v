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
export const isEkedpSuccessful = (val: any, statusCodeValue: string) => {
  return (
    val !== null &&
    val !== undefined &&
    val === "0" &&
    statusCodeValue !== null &&
    statusCodeValue.includes("success")
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

function convertArrayOfObjectsToCSV(array: any) {
  let result: any;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  // console.log("THE TNXS:::", theTnxs)
  const keys = !isNullOrUndefined(array) ? Object.keys(array[0]) : [];

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item: { [x: string]: any }) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export const downloadCSV = (array: any) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};
