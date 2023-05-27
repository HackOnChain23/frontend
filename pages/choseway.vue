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
        class="container mx-auto w-full h-[30rem] flex p-4 gap-x-8 backdrop-blur-sm mt-40"
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
          <input
            type="text"
            placeholder="Insert your TokenId..."
            class="bg-black border border-gray-500 py-2 w-3/5 px-4 mb-5"
          />
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

const loader = useState<boolean>("loader");
const store = useWalletStore();

const join = () => {
  loader.value = true;
  store.join(contractAbi);
};
</script>
