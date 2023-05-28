<template>
  <section class="container mx-auto w-full h-auto backdrop-blur-sm flex">
    <Loader v-if="loader" />
    <div class="h-[62.5rem] w-1/2 p-4">
      <div class="w-full h-full p-4">
        <p class="text-white/90 text-left text-2xl">
          Upload your block or generate with AI
        </p>
        <div class="w-full h-[15rem] flex">
          <div
            class="h-full w-full flex flex-col justify-center space-y-4 items-start duration-500"
          >
            <p class="text-white/90 mb-2 text-left">
              Select an empty block and add your piece by clicking on it.
            </p>

            <div
              v-if="!store.parts"
              class="h-auto flex w-full bg-black space-y-4 flex-col"
            >
              <div class="flex w-full border border-blue-500">
                <input
                  type="text"
                  class="w-full text-white bg-black p-2"
                  placeholder="Name..."
                  v-model="name"
                />
              </div>
              <div class="flex w-full border border-blue-500">
                <input
                  type="text"
                  class="w-full text-white bg-black p-2"
                  placeholder="Description..."
                  v-model="description"
                />
              </div>
            </div>
            <!-- <p class="text-white w-8/12 text-center">
              The photo in the preview will be added as the first or next block
              in the grid.
            </p>
            <label
              for="files"
              class="px-6 w-auto h-min py-2 rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
              >Preview block</label
            >
            <input
              @change="previewPhoto($event)"
              id="files"
              type="file"
              class="hidden"
              text="chose"
            /> -->
          </div>
          <!-- <div
            class="h-full w-1/2 justify-center items-center"
            :class="{ flex: photoToUpload, hidden: !photoToUpload }"
          >
            <div class="w-full h-full flex items-center p-4 justify-center">
              <p class="hidden">Preview</p>
              <div
                class="w-full h-full p-4 border-2 relative border-blue-500 rounded-lg"
              >
                <div
                  @click="deletePhoto()"
                  class="absolute w-8 h-8 cursor-pointer rounded-full bg-white text-black font-bold flex items-center justify-center right-0 top-0"
                >
                  X
                </div>
                <img class="w-full h-full object-cover" :src="photoToUpload" />
              </div>
            </div>
          </div> -->
        </div>
        <div class="mt-4">
          <p class="text-white mb-2 text-left">
            Feeling empty-headed and lacking ideas? <br />Ask AI, and I'll
            generate a few suggestions for you.
          </p>
          <div class="h-10 flex bg-black border border-blue-500">
            <input
              type="text"
              class="w-full text-white bg-black p-2"
              placeholder="Type your input here..."
              v-model="aiInput"
            />
            <button
              class="h-full w-32 hover:scale-110 duration-300 right-0h-10 rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
              @click="ai()"
            >
              Ask
            </button>
          </div>
        </div>
        <p v-if="aiState" class="text-cyan_gradient mt-4 mb-2 text-center">
          There you have four sample photos based on your input. Choose visely
        </p>
        <div
          class="flex items-center justify-center"
          :class="{ flex: aiState, hidden: !aiState }"
        >
          <div class="w-6/12 h-full flex flex-wrap items-center justify-center">
            <div
              class="w-1/2 flex items-center justify-center"
              v-for="(photo, photoIndex) in photos"
            >
              <img
                @click="choosePhoto(photoIndex)"
                class="hover:scale-150 duration-300 h-[12rem] w-[12rem]"
                :class="{
                  'border-4 border-blue-500 scale-110':
                    chosenPhoto == photos[photoIndex],
                }"
                :src="photo"
              />
            </div>
          </div>
          <div
            class="3/12 hidden p-4 flex flex-col space-y-1 items-center justify-center"
          >
            <button
              class="hover:scale-110 duration-300 h-20 w-full text-sm rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
            >
              Top Left
            </button>
            <button
              class="hover:scale-110 duration-300 h-20 w-full text-sm rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
            >
              Top Right
            </button>
            <button
              class="hover:scale-110 duration-300 h-20 w-full text-sm rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
            >
              Bottom Left
            </button>
            <button
              class="hover:scale-110 duration-300 h-20 w-full text-sm rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
            >
              Bottom Right
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[60rem] flex items-center justify-around w-1/2 p-4 flex-col">
      <div class="w-10/12 h-5/6 border border-gray-500">
        <div id="photo" class="flex flex-wrap w-full h-full">
          <div
            class="w-1/2 h-1/3 border border-gray-500 flex justify-center items-center"
            v-for="(photo, index) in exampleOutput"
            :key="index"
          >
            <form v-if="chosenPhoto.length == 0" enctype="multipart/form-data">
              <label
                :for="photo"
                class="px-10 w-auto h-auto cursor-pointer hover:text-white py-4 rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
                :class="{ hidden: photoToUpload }"
                >{{ index + 1 }}</label
              >
              <input
                :id="photo"
                @change="previewPhoto($event, index)"
                :key="index"
                type="file"
                class="hidden inputButton"
              />
            </form>
            <form v-if="chosenPhoto.length > 0">
              <div
                class="px-10 w-auto animate-bounce h-auto cursor-pointer hover:text-white py-4 rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
                :class="{ hidden: photoToUpload }"
                @click="previewPhoto($event, index)"
              >
                {{ index + 1 }}
              </div>
            </form>
            <div
              class="h-full w-full justify-center items-center"
              :class="{
                flex: photosToPreview[index].src,
                hidden: photosToPreview[index].src == undefined,
              }"
            >
              <div class="w-full h-full flex items-center p-4 justify-center">
                <p class="hidden">Preview</p>
                <div
                  class="w-full h-full border-2 relative border-blue-500 rounded-lg"
                >
                  <div
                    @click="deletePhoto(index)"
                    class="absolute w-8 h-8 cursor-pointer rounded-full bg-white text-black font-bold flex items-center justify-center right-0 top-0"
                  >
                    X
                  </div>
                  <img
                    class="w-full h-full rounded-lg object-cover"
                    :src="photosToPreview[index].src"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form enctype="multipart/form-data">
        <div
          @click="sendPhoto()"
          class="hover:scale-110 cursor-pointer flex justify-center items-center duration-300 h-16 text-xl text-white w-80 text-sm rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
        >
          Apply
        </div>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
const photoToUpload = ref();

import { Input } from "postcss";
import { useWalletStore } from "~/store/wallet.store";
const loader = useState<boolean>("loader");
const store = useWalletStore();
const aiInput = ref<string>("");
const name = ref();
const description = ref();
const chosenPhotoIndex = ref();

interface IPreview {
  src: string | undefined;
}
const photosToPreview = ref<IPreview[]>([
  { src: undefined },
  { src: undefined },
  { src: undefined },
  { src: undefined },
  { src: undefined },
  { src: undefined },
]);

// onMounted(() => {
//   if (store.parts) {
//     Object.values(store.parts).forEach((photo, index) => {
//       photosToPreview.value[index].src = photo;
//     });
//   }
// });

const aiState = ref<boolean>(false);
const input = ref();
let photos = [
  "assets/example/1.jpeg",
  "assets/example/2.jpeg",
  "assets/example/3.jpeg",
  "assets/example/4.jpeg",
];
let fileToSend: EventTarget | undefined;

const chosenPhoto = ref<string>("");
const choosePhoto = (index: number) => {
  deletePhoto();
  chosenPhoto.value = photos[index];
};

const sendPhoto = () => {
  if (fileToSend != undefined) {
    let promise = new Promise((r) => {
      loader.value = true;
      r(
        store.upload(
          fileToSend,
          name.value,
          description.value,
          chosenPhotoIndex.value
        )
      );
    });
  } else {
    let promise = new Promise((r) => {
      loader.value = true;
      r(
        store.upload(
          chosenPhoto.value,
          name.value,
          description.value,
          chosenPhotoIndex.value
        )
      );
    });
  }
};

const exampleOutput = ["1", "2", "3", "4", "5", "6"];
const deletePhoto = (index?) => {
  photoToUpload.value = undefined;
  console.log(index);
  if (index) {
    photosToPreview.value[index].src = undefined;
  } else {
    photosToPreview.value.forEach((elem) => (elem.src = undefined));
  }

  chosenPhoto.value = "";
  fileToSend = undefined;
};
const previewPhoto = (e, photoIndex) => {
  console.log(photoIndex, "indeeeeeex");
  chosenPhotoIndex.value = photoIndex;
  if (chosenPhoto.value.length > 0) {
    photosToPreview.value[photoIndex].src = chosenPhoto.value;
    photoToUpload.value = chosenPhoto.value;
  } else {
    const inputClick = document.querySelector(".inputButton");
    if (!e.target.files[0]) inputClick.click();

    fileToSend = e.target.files[0];
    const photo = URL.createObjectURL(e.target.files[0]);
    photoToUpload.value = photo;
    photosToPreview.value[photoIndex].src = URL.createObjectURL(
      e.target.files[0]
    );
  }

  console.log(photosToPreview.value, "preiew");
};

const ai = () => {
  aiState.value = true;
  loader.value = true;
  store.askAi(aiInput.value).then((res) => {
    photos = [];
    res.data.forEach((elem) => {
      photos.push(elem.url);
    });
    loader.value = false;
    console.log(res.data, "comp");
  });
};
</script>
