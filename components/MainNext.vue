<template>
  <section class="bg-black w-full h-full">
    <div class="bg-black w-full h-[37rem] flex flex-col items-center">
      <div
        v-if="connected"
        class="bg-black w-full flex flex-col items-center duration-500 overflow-hidden"
        :class="{ 'h-0': contractResult, 'h-[20rem]': !contractResult }"
      >
        <h1
          class="text-5xl h-16 text-cyan_gradient font-bold text-white mb-4 text-white"
        >
          {{ title }}
        </h1>
        <div
          class="flex w-[40rem] flex-col duration-500 overflow-hidden"
          :class="{
            'h-40 translate-y-0 opacity-100': menuState,
            'h-0 translate-y-full opacity-0 ': !menuState,
          }"
        >
          <div
            class="w- h-14 bg-black border border-gray-500 mb-2 rounded-full flex justify-between items-center hover:border-gray-200 duration-300"
          >
            <p
              class="w-[10rem] flex items-center justify-center h-12 bg-black text-white bg-violet_gradient rounded-l-full ml-1 text-base hover:text-lg duration-300"
            >
              Address
            </p>
            <input
              v-model="form.address"
              placeholder="Smart contract address"
              type="text"
              class="ml-4 bg-black w-full mx-2 h-4/6 outline-none text-white"
            />
          </div>
          <div
            class="w h-14 bg-black border border-gray-500 mb-2 rounded-full flex justify-between items-center hover:border-gray-200 duration-300"
          >
            <p
              class="w-[10rem] h-12 bg-black flex items-center justify-center text-white bg-violet_gradient rounded-l-full ml-1 text-base hover:text-lg duration-300"
            >
              ABI
            </p>
            <input
              v-model="form.abi"
              placeholder="ABI"
              type="text"
              class="ml-4 bg-black w-full mx-2 h-4/6 outline-none text-white"
            />
          </div>
        </div>
        <div v-if="buttons">
          <button
            v-if="!menuState"
            @click="toggleData()"
            class="mt-10 rounded-full bg-violet_gradient text-white px-8 py-3"
          >
            Get me in
          </button>
          <button
            v-if="menuState"
            @click="callContract()"
            class="mt-10 rounded-full bg-violet_gradient text-white px-8 py-3"
          >
            Call contract
          </button>
        </div>
      </div>
      <p class="text-white text-3xl font-medium animate-pulse">
        {{ contractResult }}
      </p>
    </div>
    <div></div>
  </section>
</template>
<script setup lang="ts">
import { useWalletStore } from "~/store/wallet.store.ts";
const store = useWalletStore();

const connected = useState("connected");
console.log(connected.value);
const menuState = ref<boolean>(false);
const address = ref();
const abi = ref();
const title = ref<string>("Join and get involved in the project");
const buttons = ref<boolean>(true);

const contractResult = useState<string>("contractResult");

const form = reactive({
  address: "",
  abi: "",
});

const toggleData = () => {
  menuState.value = !menuState.value;
};

const callContract = () => {
  buttons.value = false;
  store
    .callSmartContract(form.address, form.abi)
    .then(() => (title.value = "Wait for result..."));
  toggleData();
};
</script>
<style lang="sass">
.text
    &-cyan_gradient
        background: rgb(73,69,252)
        background: linear-gradient(90deg, rgba(73,69,252,1) 1%, rgba(6, 162, 212,1) 40%)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
</style>
