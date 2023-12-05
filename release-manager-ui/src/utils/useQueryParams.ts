type QueryParams = {
  [key: string]: unknown;
};

export function useQueryParams() {
  const convertToString = (value: unknown) => {
    if (typeof value === "string") {
      return value;
    } else if (value instanceof Date) {
      return (
        value.getMonth() + 1 + "/" + value.getDate() + "/" + value.getFullYear()
      );
    } else if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value?.toString() || "";
  };

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {} as QueryParams;
    params.forEach((value, key) => {
      queryParams[key] = value;
    });
    return queryParams;
  };

  const setQueryParams = (queryParams: QueryParams) => {
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (value) {
        params.set(key, convertToString(queryParams[key]));
      }
    });
    if (params.toString() !== "") {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    }
  };

  return { getQueryParams, setQueryParams };
}
