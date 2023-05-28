<template>
  <section
    class="h-[30rem] container mx-auto bg-transparent pointer-event-none"
  >
    <div
      class="w-full h-auto bg-transparent pointer-event-none fixed duration-500 top-0"
      :class="{
        'opacity-0 invisible': scrolled,
        'opacity-100, visible': !scrolled,
      }"
    >
      <div class="relative -top-10">
        <div
          class="w-1/4 fixed h-40 blur-[50px] bg-white/80 ponter-event-none z-30 rounded-b-full mx-auto left-0 right-0"
        ></div>
        <div
          class="w-2/4 fixed top-0 h-1/3 z-20 blur-[120px] ponter-event-none bg-cyan-500/60 rounded-b-full mx-auto left-0 right-0"
        ></div>
        <div
          class="w-11/12 fixed top-0 h-1/2 blur-[160px] ponter-event-none z-10 bg-violet-900 rounded-b-full mx-auto left-0 right-0"
        ></div>
      </div>
    </div>

    <div
      class="w-full h-auto pointer-event-auto bg-transparent drop-shadow-2xl flex items-center justify-center flex-col z-50 pt-40"
    >
      <h1
        class="text-6xl h-32 z-10 font-bold tracking-[-.3rem] text-white mb-4 text-stroke text-center text-white"
      >
        One Collective Masterpiece<br />Born of Six Creators
      </h1>
      <h2 class="text-xl font-thin text-white tracking-[-.05rem]">
        Artistic concept based on blockchain.
      </h2>
      <!-- <div
        class="my-5 w-auto px-4 border rounded-full p-1 flex items-center justify-center duration-500"
        :class="{
          'h-0 opacity-0': walletId == undefined,
          'h-10 opacity-100': walletId,
        }"
      >
        <img class="w-10 p-2" src="~/assets/images/metamask.svg" />
        <p class="text-cyan-500">{{ walletId }}</p>
      </div> -->
      <!-- <div
        class="w-[30rem] h-14 bg-black border border-gray-500 mt-10 rounded-full flex justify-between items-center hover:border-gray-200 duration-300"
      >
        <input
          placeholder="Enter your email"
          type="text"
          class="ml-4 bg-black w-full mx-2 h-5/6 outline-none text-white"
        />
        <button
          class="w-[10rem] h-12 bg-black text-white bg-violet_gradient rounded-full mr-1 text-base hover:text-lg duration-300"
        >
          Join
        </button>
      </div> -->
      <div class="h-40">
        <div
          class="w-[40rem] shadow-blue-700 p-0.5 mt-10 rounded-sm flex justify-center items-center hover:border-gray-200 duration-300"
        >
          <p
            v-if="!walletId"
            class="text-4xl h-16 text-cyan_gradient font-bold text-white mb-4 text-white font-mono"
          >
            Connect to wallet firstly
          </p>
          <nuxt-link
            v-if="walletId"
            to="/choseway"
            class="w-full flex justify-center items-center box-border h-12 text-white bg-violet_gradient rounded-sm text-base hover:text-lg duration-300"
          >
            Join
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useWalletStore } from "~/store/wallet.store";

const walletId = useState<string>("walletAddress");
const scrolled = ref<boolean>(true);
const store = useWalletStore();

const scrollState = (): void => {
  scrolled.value = window.scrollY > 0 ? true : false;
};
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollState();
  });
  scrollState();
});
</script>
<style lang="sass"></style>
