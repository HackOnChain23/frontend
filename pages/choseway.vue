<template>
  <div class="bg-black h-full w-full">
    <ParticlesComponent />

    <section class="w-screen mx-auto container h-[62.5rem] overflow-hidden">
      <Loader class="" v-if="loader" />
      <div
        class="container text-center w-full h-[62.5rem] mx-auto flex items-center justify-center backdrop-blur-sm"
        v-if="!walletId"
      >
        <p
          class="text-4xl h-16 animate-bounce text-cyan_gradient font-bold mb-4 font-mono"
        >
          Connect to wallet firstly
        </p>
      </div>

      <div
        v-if="walletId"
        class="container mx-auto w-full h-[40rem] flex p-4 gap-x-8 backdrop-blur-sm mt-40"
      >
        <div
          class="w-1/2 h-full p-8 border border-gray-200 rounded-lg flex flex-col justify-center items-center"
        >
          <h1 class="text-white/90 text-3xl text-center mb-32">
            Start a new game, add the first part, and invite others to join in!
          </h1>
          <nuxt-link
            to="/workspace"
            class="hover:scale-110 flex items-center justify-center text-2xl text-white/90 duration-300 h-20 w-1/2 rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
          >
            Start a new game
          </nuxt-link>
        </div>
        <div
          class="w-1/2 h-full p-8 border border-gray-200 rounded-lg flex flex-col justify-center items-center"
        >
          <h1 class="text-white/90 text-3xl text-center">
            Join in creating the masterpiece and add something of your own!
          </h1>

          <p class="text-white/90 text-xl text-center mt-10">
            Check availability:
          </p>
          <div class="relative">
            <button
              id="dropdownDefaultButton"
              @click="dropdownState()"
              data-dropdown-toggle="dropdown"
              class="text-white w-[21rem] bg-blue-700 mb-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {{ chosenOption }}
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-10 absolute top-12 w-[21rem] bg-white flex-col rounded-sm shadow h-auto dark:bg-gray-700"
              :class="{ flex: listState, hidden: !listState }"
            >
              <Loader v-if="!tokens" class="w-full" />
              <ul
                class="py-2 h-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li
                  class="cursor-pointer space-y-2"
                  v-for="elem in fakeData"
                  @click="changeOption(elem)"
                >
                  <div class="flex justify-between items-center px-4 py-1">
                    <p>{{ elem.name }}</p>
                    <img class="w-8 h-8" :src="elem.image" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <button
            @click="join()"
            class="hover:scale-110 text-white/90 text-2xl duration-300 h-20 w-1/2 rounded-sm shadow-sm shadow-blue-500 bg-violet_gradient"
          >
            Check & Join
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const walletId = useState<string>("walletAddress");
import { useWalletStore } from "~/store/wallet.store";
import contractAbi from "~/data/abi_contract.json";
import fakeData from "~/data/token.json";

const chosenOption = ref<string>("Dropdown button");
const listState = ref<boolean>(false);
const loader = useState<boolean>("loader");
const store = useWalletStore();
const tokens = useState("tokens");

const router = useRouter();

const join = () => {
  router.push("/workspace");
};

const changeOption = (elem) => {
  store.parts = elem.parts;
  chosenOption.value = elem.name;
  dropdownState();
};

const dropdownState = () => {
  listState.value = !listState.value;
};
</script>
