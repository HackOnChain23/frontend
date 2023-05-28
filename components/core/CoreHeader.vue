<template>
  <section class="w-full flex justify-center">
    <div
      class="h-32 container mx-auto w-full bg-inherit w-full flex flex-row items-center justify-between px-8 fixed z-50"
      :class="{
        'backdrop-blur-sm ': scrolled,
        '': !scrolled,
      }"
    >
      <nuxt-link to="/">
        <img
          src="~/assets/images/logo.svg"
          class="h-16"
          fill="currentColor"
          alt="logo"
        />
      </nuxt-link>
      <div class="space-x-5 flex items-center">
        <nuxt-link
          :to="{ path: '/', hash: '#meetUs' }"
          class="py-2 px-4 text-white/80 font-medium"
          >AboutUs</nuxt-link
        >
        <nuxt-link
          class="py-2 px-4 text-white/80 font-medium"
          :to="{ path: '/', hash: '#howItWorks' }"
          >Documentation</nuxt-link
        >
        <button
          @click="contact()"
          class="py-3 px-5 rounded-sm font-medium bg-violet_gradient text-white shadow-blue-800 shadow-xl"
          :class="{
            'opacity-0 hidden': walletId,
            'opacity-100': walletId == undefined,
          }"
        >
          Connect to wallet
        </button>
        <div
          class="py-1 px-8 w-fit border rounded-sm flex items-center justify-center duration-500"
          :class="{
            'opacity-0 hidden': walletId == undefined,
            'opacity-100': walletId,
          }"
        >
          <img class="w-10 p-2" src="~/assets/images/metamask.svg" />
          <p class="text-cyan-500">{{ shortId }}...</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useWalletStore } from "~/store/wallet.store";
import fakeData from "~/data/token.json";

const buttonState = ref("Connect to wallet");
const walletId = useState<string>("walletAddress");
let shortId = ref();
const store = useWalletStore();

const contact = () => {
  store
    .connectWallet()
    .then(() => (shortId.value = walletId.value.slice(0, 10)))
    .then(() => {
      store.getTokens().then((res) => {
        store.tokens = res;
        // store.parts = fakeData[0].parts;
      });
    });
};

const scrolled = ref<boolean>(true);

const scrollState = (): void => {
  scrolled.value = window.scrollY > 50 ? true : false;
};
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollState();
  });
  scrollState();
});

// const connectWallet = async () => {
//   const web3 = await store.getWeb3();
//   const walletAddress = await web3.eth.requestAccounts();
//   store.walletAddress = walletAddress;
//   console.log(store.walletAddress);
//   //   walletId.value = walletAddress[0];
// };
</script>

<style lang="sass">
.bg
    &-violet_gradient
        background: rgb(73,69,252)
        background: linear-gradient(90deg, rgba(73,69,252,1) 1%, rgba(6, 182, 212,1) 150%)
</style>
