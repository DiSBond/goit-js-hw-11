const axios = require('axios').default;

const inputEl = document.querySelector("input");
const BASE_URL = "https://pixabay.com/api/";

const options = {
      params: {
        key: "25358610-6c58710bcb07b0c67b61215e4",
        q: "",
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
      },
};

export async function getPictures() {
    try {
      options.params.q = inputEl.value;

      const response = await axios(BASE_URL, options);
         return response;
    } catch (error) {
        console.log(error);
    }
  }

export function getMorePictures() {
  options.params.page += 1;
  const pageCount = options.params.page * options.params.per_page;

  return pageCount
  }
